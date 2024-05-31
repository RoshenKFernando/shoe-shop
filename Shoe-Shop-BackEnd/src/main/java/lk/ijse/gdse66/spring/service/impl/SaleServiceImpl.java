package lk.ijse.gdse66.spring.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.AdminPanelDTO;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.entity.*;
import lk.ijse.gdse66.spring.repo.CustomerRepo;
import lk.ijse.gdse66.spring.repo.ItemRepo;
import lk.ijse.gdse66.spring.repo.SaleDetailsRepo;
import lk.ijse.gdse66.spring.repo.SaleRepo;
import lk.ijse.gdse66.spring.service.SaleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepo repo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private SaleDetailsRepo saleDetailsRepo;

    @Autowired
    private ModelMapper mapper;

    public void placeOrder(SalesDTO dto) {
        if (repo.existsById(dto.getOid())) {
            throw new RuntimeException("Order Id " + dto.getOid() + " already exists. Please enter another id!");
        }

        dto.setStatus("ACTIVE");
        Sales sales = mapper.map(dto, Sales.class);
        Sales save = repo.save(sales);

        for (SaleDetailsDTO saleDetailsDTO : dto.getSaleDetails()) {
            if (saleDetailsDTO.getItemCode() == null) {
                throw new IllegalArgumentException("Code must not be null for sale details");
            }

            // Map DTO to entity
            SaleDetails saleDetails = new SaleDetails();
            saleDetails.setQty(saleDetailsDTO.getQty());
            saleDetails.setUnitPrice(saleDetailsDTO.getUnitPrice());
            saleDetails.setItemCode(saleDetailsDTO.getItemCode());
            saleDetails.setOid(saleDetailsDTO.getOId());

            // Save entity to database
            saleDetailsRepo.save(saleDetails);
        }

        // Update item quantities and customer loyalty points
        for (SaleDetails sd : save.getSaleDetails()) {
            Item item = itemRepo.findById(sd.getItemCode()).orElseThrow(() ->
                    new RuntimeException("Item not found with code: " + sd.getItemCode())
            );
            sd.setStatus("ACTIVE");
            item.setQty(item.getQty() - sd.getQty());
            itemRepo.save(item);

            // Check if the unit price is greater than 800
            if (sd.getUnitPrice() > 800) {
                // Update customer loyalty points
                Customer customer = customerRepo.findById(dto.getCustomer().getCode()).orElseThrow(() ->
                        new RuntimeException("Customer not found with code: " + dto.getCustomer().getCode())
                );
                customer.setLoyaltyPoints(customer.getLoyaltyPoints() + 1);
                customerRepo.save(customer);
 }
}
    }



    @Override
    public ArrayList<SalesDTO> LoadOrders() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SalesDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(saleDetailsRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public CustomDTO getSumOrders() {
        return null;
    }

    @Override
    public SaleDetails getOrderById(String id) {
        // Check if the id is null or empty before invoking findById
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID must not be null or empty");
        }


        Optional<SaleDetails> optionalSaleDetails = saleDetailsRepo.findById(id);

        if (optionalSaleDetails.isPresent()) {
            return optionalSaleDetails.get();
        } else {
            throw new EntityNotFoundException("Order with id " + id + " not found");
         }
}

    public List<SalesDTO> getTodayCount() {
        List<Sales> todayOrders = repo.findTodayOrders();
        return mapper.map(todayOrders, new TypeToken<List<SalesDTO>>() {}.getType());

            }

    @Override
    public Integer totalSalesCount() {
        return repo.totalSalesCount();
    }

    @Override
    public AdminPanelDTO getAdminPanelDetails() {

        AdminPanel panel = getAdminPanel();
        if (panel != null) {
            return mapper.map(panel, AdminPanelDTO.class);
        } else {
            throw new RuntimeException();
     }
  }

    @Override
    public AdminPanel getAdminPanel() {
        Map<String, Object> mostPurchasedItem = saleDetailsRepo.findMostPurchasedItem();
        if (mostPurchasedItem != null && !mostPurchasedItem.isEmpty()) {
            String itemCode = (String) mostPurchasedItem.get("itemCode");
            BigDecimal totalQuantityBigDecimal = (BigDecimal) mostPurchasedItem.get("totalQuantity");

            // Convert BigDecimal to Long
            Long totalQuantity = totalQuantityBigDecimal != null ? totalQuantityBigDecimal.longValue() : null;

            // Fetch item details from itemRepo
            Item inventory = itemRepo.findById(itemCode).orElse(null);

            // Calculate total buy cost
            BigDecimal totalBuyBigDecimal = (BigDecimal) saleDetailsRepo.getTotalCost().get("totalCost");
            Double totalBuy = totalBuyBigDecimal != null ? totalBuyBigDecimal.doubleValue() : null;

            // Handle the case where totalSales is null
            Double totalSales = saleDetailsRepo.getItmTotal();
            if (totalSales == null) {
                totalSales = 0.0; // Assign a default value
            }

            // Calculate profit
            Double profit = totalSales - (totalBuy != null ? totalBuy : 0.0);

            // Create and return AdminPanel object
            return new AdminPanel("dash", totalSales, profit, itemCode, inventory != null ? inventory.getItemPicture() : null, totalQuantity != null ? totalQuantity.intValue() : null);
        }
        return null;
}

    @Override
    public boolean canBeReturned(String orderNo) {
        Sales sales = repo.findById(orderNo).orElse(null);
        if (sales == null) {
            // Handle case where order with given orderNo does not exist
            return false;
        }

        // Assuming the purchase date is stored in a standard format like "yyyy-MM-dd"
        String purchaseDateStr = sales.getPurchaseDate();
        String[] split = purchaseDateStr.split(" ");
        String date = split[0];
        System.out.println(date);
        LocalDate purchaseDate;

        try {
            purchaseDate = LocalDate.parse(date);
        } catch (DateTimeParseException e) {
            // Handle parsing error, e.g., log it and return false
            System.err.println("Failed to parse purchase date: " + e.getMessage());
            return false;
        }

        // Calculate the date three days from the purchase date
        LocalDate threeDaysFromPurchase = purchaseDate.plusDays(3);

        // Get the current date
        LocalDate currentDate = LocalDate.now();

        // Check if the current date is within three days from the purchase date
        return !currentDate.isAfter(threeDaysFromPurchase);

    }

    @Override
    public ArrayList<SaleDetailsDTO> returnFullOrder(String id) {
        Sales oid = repo.findByOid(id);
        if (!oid.getStatus().equals("RETURNED")){
            oid.setStatus("RETURNED");
            Sales sales = new Sales();
            sales.setOid(id);
            System.out.println(sales.getOid());
            List<SaleDetails> allByOid = saleDetailsRepo.findAllBySale(sales);
            for (SaleDetails saleDetails:allByOid) {
                int qty = saleDetails.getQty();
                saleDetails.setReturn_qty(qty);
                saleDetails.setQty(0);
                Item item = itemRepo.findByCode(saleDetails.getItemCode());
                item.setQty(item.getQty()+qty);
                saleDetails.setStatus("RETURNED");
            }

            return mapper.map(allByOid,new TypeToken<List<SaleDetailsDTO>>(){}.getType());
        }else {
            throw new  RuntimeException("This order already return");
}
    }

    @Override
    public ArrayList<SaleDetailsDTO> loadReturnOrders() {
        return mapper.map(saleDetailsRepo.findAllByStatus("RETURNED"),new TypeToken<ArrayList<SaleDetailsDTO>>(){}.getType());
    }

    @Override
    public void returnOneOrder(SaleDetailsDTO saleDetailsDTO) {
        if (saleDetailsRepo.existsByOidAndItemCode(saleDetailsDTO.getOId(),saleDetailsDTO.getItemCode())){
            SaleDetails byOidAndItemCode = saleDetailsRepo.findByOidAndItemCode(saleDetailsDTO.getOId(), saleDetailsDTO.getItemCode());
            if (!byOidAndItemCode.getStatus().equals("RETURNED")){
                if (byOidAndItemCode.getQty()>=saleDetailsDTO.getQty()){
                    int qty= byOidAndItemCode.getQty();
                    byOidAndItemCode.setQty(byOidAndItemCode.getQty()-saleDetailsDTO.getQty());
                    byOidAndItemCode.setReturn_qty(byOidAndItemCode.getReturn_qty()+saleDetailsDTO.getQty());
                    Item byCode = itemRepo.findByCode(saleDetailsDTO.getItemCode());
                    byCode.setQty(byCode.getQty()+saleDetailsDTO.getQty());

                    List<SaleDetails> allByOid = saleDetailsRepo.findAllByOid(saleDetailsDTO.getOId());


                    if (qty == saleDetailsDTO.getQty()){
                        byOidAndItemCode.setStatus("RETURNED");
                        int count = 0;
                        for (SaleDetails saleDetails:allByOid) {
                            if (saleDetails.getStatus().equals("RETURNED")){
                                count++;
                            }

                        }
                        if (count==allByOid.size()){
                            Sales byOid = repo.findByOid(saleDetailsDTO.getOId());
                            byOid.setStatus("RETURNED");
                        }
                    }

                }else {
                    throw new RuntimeException("This qty you entered is too high");
                }

            }else {
                throw new RuntimeException("This order already returned");
            }
        }else {
            throw new RuntimeException("Order Not Found");
}

    }


}

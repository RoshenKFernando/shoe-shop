package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.AdminPanelDTO;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.entity.AdminPanel;
import lk.ijse.gdse66.spring.entity.SaleDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

public interface SaleService {

    void placeOrder(@RequestBody SalesDTO dto);
    ArrayList<SalesDTO> LoadOrders();
    ArrayList<SaleDetailsDTO> LoadOrderDetails();

    @ResponseBody
    CustomDTO OrderIdGenerate();
    @ResponseBody
    CustomDTO getSumOrders();

    SaleDetails getOrderById(String id);

    List<SalesDTO> getTodayCount();

    Integer totalSalesCount();

    AdminPanelDTO getAdminPanelDetails();

    AdminPanel getAdminPanel();

    boolean canBeReturned(String orderNo);

    ArrayList<SaleDetailsDTO> returnFullOrder(String id);

    ArrayList<SaleDetailsDTO> loadReturnOrders();

    void returnOneOrder(SaleDetailsDTO saleDetailsDTO);
}

package lk.ijse.gdse66.spring.dto;

import lk.ijse.gdse66.spring.enums.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesDTO {
    private String oid;
    private String purchaseDate;
    private Double total;
    private Payment paymentMethod;
    private Integer totalPoints;
    private String cashier;
    private CustomerDTO customer;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
    private String status;

}

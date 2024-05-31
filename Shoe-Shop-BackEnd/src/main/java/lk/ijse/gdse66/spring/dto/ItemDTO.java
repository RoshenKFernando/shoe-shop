package lk.ijse.gdse66.spring.dto;

import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.spring.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {

    private String code;
    private String Name;
    private Integer qty;
    private String itemPicture;
    private String category;
    private Integer size;
    private Supplier supplier;
    private String supName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;

}

package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AdminPanel {
    @Id
    private String id;
    private Double totalSales;
    private Double totalProfit;
    private String mostSaleItem;
    @Column(columnDefinition = "LONGTEXT")
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;

}

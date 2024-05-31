package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(SaleDetail_PK.class)
public class SaleDetails {

    @Id
    private String oid;
    @Id
    private String itemCode;

    private int qty;
    private double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false, updatable = false)
    private Sales sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code",referencedColumnName = "code",insertable = false, updatable = false)
    private Item items;

    private Double itmTotal;
    private String status;
    private int return_qty;
}

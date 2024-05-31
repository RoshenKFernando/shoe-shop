package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer {
    @Id
    private String code;
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Temporal(TemporalType.DATE)
    private Date loyaltyDate;
    @Enumerated(EnumType.STRING)
    private Level level;
    private Integer loyaltyPoints;
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Embedded
    private Address address;
    private String contact;
    private String email;
    private String recentPurchaseDate;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "customer")
    private List<Sales> sales = new ArrayList<>();

}

package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Supplier {
    @Id
    private String Code;
    private String name;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Embedded
    private Address address;
    private String contact1;
    private String contact2;
    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Item> items;
}

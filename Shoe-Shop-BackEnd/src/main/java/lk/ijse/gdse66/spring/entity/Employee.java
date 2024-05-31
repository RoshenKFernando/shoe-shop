package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Designation;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee {
    @Id
    private String code;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String pic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String status;
    @Enumerated(EnumType.STRING)
    private Designation designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Temporal(TemporalType.DATE)
    private Date birth;
    @Temporal(TemporalType.DATE)
    private Date joinDate ;
    private String branch;
    @Embedded
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;


}

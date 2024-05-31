package lk.ijse.gdse66.spring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {
    private String code;
    @NotBlank(message = "Employee Name cannot be blank")
    @Pattern(regexp = "^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$", message = "Invalid name format")
    private String name;
    private String pic;
    private Gender gender;
    private String status;
    private String designation;
    private Role role;
    private Date birth;
    private Date joinDate ;
    private String branch;
    private Address address;
    @NotBlank(message = "Contact number cannot be blank")
    @Pattern(regexp = "^\\+?[0-9()-]{1,11}$", message = "Invalid contact number format")
    private String contact;
    @NotBlank(message = "Email cannot be blank")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;
    private String person;
    private String EmgContact;

    private UserDTO user;
}

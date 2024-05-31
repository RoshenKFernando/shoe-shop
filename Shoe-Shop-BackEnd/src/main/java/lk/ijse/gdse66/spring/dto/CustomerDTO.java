package lk.ijse.gdse66.spring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String code;
    @NotBlank(message = "Customer Name Cannot Be Null")
    @Pattern(regexp = "^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$", message = "Name not valid")
    private String name;
    private Gender gender;
    private Date loyaltyDate;
    private Level level;
    private Integer loyaltyPoints;
    private Date dob;
    private Address address;
    @NotBlank(message = "Customer Contact Number Cannot Be Null")
    @Pattern(regexp = "^\\+?[0-9()-]{1,11}$", message = "Contact Number not valid")
    private String contact;
    @NotBlank(message = "Customer Email Cannot Be Null")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email not valid")
    private String email;
    private String recentPurchaseDate;

}

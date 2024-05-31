package lk.ijse.gdse66.spring.embeded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Embeddable
public class Address {
    String address1;
    String address2;
    String address3;
    String address4;
    String address5;
}

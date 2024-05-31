package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.CustomerDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.dto.SupplierDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(String id);
   /* CustomerDTO searchCusId(String id);*/
   CustomerDTO searchCusId(String code, String name);
    ArrayList<CustomerDTO> loadAllCustomer();
    CustomerDTO searchCustId(String id);

    @ResponseBody
    CustomDTO customerIdGenerate();
    CustomDTO getSumCustomer();
    Integer getTotalCustomerCount();
}

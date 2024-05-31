package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.*;
import lk.ijse.gdse66.spring.entity.Customer;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.entity.Supplier;
import lk.ijse.gdse66.spring.repo.CustomerRepo;
import lk.ijse.gdse66.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getCode())) {
            throw new RuntimeException("Customer Already Exist. Please enter another id..!");
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! customerId : "+ dto.getCode());
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String id) {
        if (!customerRepo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        customerRepo.deleteById(id);
    }

    @Override
    public ArrayList<CustomerDTO> loadAllCustomer() {
        return mapper.map(customerRepo.findAll(), new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());
    }


    @Override
    public CustomerDTO searchCusId(String code, String name) {
        Customer customer = customerRepo.findEmployeeByCodeOrName(code, name);
        if (customer == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(customer, CustomerDTO.class);
    }


    @Override
    public CustomDTO customerIdGenerate() {
        return new CustomDTO(customerRepo.getLastIndex());
    }

    @Override
    public CustomDTO getSumCustomer() {
        return new CustomDTO(customerRepo.getSumCustomer());

             }

    @Override
    public Integer getTotalCustomerCount() {
        return customerRepo.totalCustomerCount();
    }


    @Override
    public CustomerDTO searchCustId(String code) {
        Optional<Customer> customer = customerRepo.findById(code);
        if (customer == null) {
            throw new RuntimeException("supplier not found with code: " + code);
        }
        return mapper.map(customer, CustomerDTO.class);
    }


}

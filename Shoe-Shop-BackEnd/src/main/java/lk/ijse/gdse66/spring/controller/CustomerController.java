package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.*;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.service.CustomerService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto, Address address){
        System.out.println(dto.toString());
        dto.setAddress(address);
        service.saveCustomer(dto);
        return new ResponseUtil("200", "Successfully Registered.!", null);
    }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllCustomer());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/cusIdGenerate")
    public @ResponseBody
    CustomDTO customerIdGenerate() {
        return service.customerIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateCustomer(@ModelAttribute CustomerDTO customerDTO, @ModelAttribute Address address){
        System.out.println(customerDTO.toString()+" "+address.toString());
        customerDTO.setAddress(address);
        service.updateCustomer(customerDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ customerDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteCustomer(@RequestParam String code){
        service.deleteCustomer(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
         }

    @GetMapping(path = "/searchCustomer")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO searchCusId(@RequestParam String code, @RequestParam String name){
        return service.searchCusId(code, name); // Adjusted method call
    }



    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/CustomerCount")
    public CustomDTO getSumCustomer(){
        return service.getSumCustomer();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCus")
    public CustomerDTO searchCustId(String code){
        return service.searchCustId(code);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalCustomerCount() {
        return service.getTotalCustomerCount();
}

}

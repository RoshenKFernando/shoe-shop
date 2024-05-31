package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.dto.SupplierDTO;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.service.SupplierService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService service;

    @GetMapping
    public ResponseUtil getAllSupplier(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllSupplier());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveSupplier(@ModelAttribute SupplierDTO supplierDTO, Address address){
        System.out.println(supplierDTO.toString());
        supplierDTO.setAddress(address);
        service.saveSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Registered.!", null);
            }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateSupplier(@ModelAttribute SupplierDTO supplierDTO,Address address){
        supplierDTO.setAddress(address);
        service.updateSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ supplierDTO.getCode(),null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteSupplier(@RequestParam String code){
        service.deleteSupplier(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

    @GetMapping(path = "/searchSupplier")
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierDTO searchSupId(@RequestParam String code, @RequestParam String name){
        return service.searchSupId(code, name); // Adjusted method call
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/SupplierIdGenerate")
    public @ResponseBody
    CustomDTO supplierIdGenerate() {
        return service.supplierIdGenerate();
      }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchSup")
    public SupplierDTO searchSupId(String code){
        return service.searchSupId(code);
       }

}

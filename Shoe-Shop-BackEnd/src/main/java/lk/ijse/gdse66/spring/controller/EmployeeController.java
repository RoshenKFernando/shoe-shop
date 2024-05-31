package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.service.EmployeeService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveEmployee(@ModelAttribute EmployeeDTO employeeDTO, Address address){
        System.out.println(employeeDTO.toString());
        System.out.println(employeeDTO.getAddress());
        employeeDTO.setAddress(address);
        /*String profile = UtilMatter.convertBase64(profilePic);
        employeeDTO.setPic(profile);*/
        service.saveEmployee(employeeDTO);
        System.out.println(employeeDTO.getCode());
        return new ResponseUtil("200", "Successfully Registered.!", null);

          }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping(path = "/update")
    public ResponseUtil updateEmployee(@ModelAttribute EmployeeDTO employeeDTO,Address address){
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestParam String code){
        service.deleteEmployee(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
           }

  /*  @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee")
    public EmployeeDTO searchEmpId(String code){
        return service.searchEmpId(code);
     }*/

    @GetMapping(path = "/searchEmployee")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDTO searchEmpId(@RequestParam String code, @RequestParam String name){
        return service.searchEmpId(code, name); // Adjusted method call
}


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllEmployee")
    public ResponseUtil getAllEmployee(){
        return new ResponseUtil("OK", "Successfully Loaded. :",
                service.loadAllEmployee());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody
    CustomDTO EmployeeIdGenerate() {
        return service.EmployeeIdGenerate();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/employeeCount")
    public CustomDTO getSumEmployee(){
        return service.getSumEmployee();
     }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalEmployeeCount() {
        return service.getTotalEmployeeCount();
    }

}

package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.repo.EmployeeRepo;
import lk.ijse.gdse66.spring.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveEmployee(EmployeeDTO dto){
        if (repo.existsById(dto.getCode())) {
            throw new RuntimeException("Employee Already Exist. Please enter another id..!");
        }
        repo.save(mapper.map(dto, Employee.class));

    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {
        if (!repo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! employeeId : "+ dto.getCode());
        }
        repo.save(mapper.map(dto, Employee.class));
    }

    @Override
    public void deleteEmployee(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(id);

    }


   /* @Override
    public EmployeeDTO searchEmpId(String code) {
        if (!repo.existsById(code)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(code).get(), EmployeeDTO.class);
    }*/

    @Override
    public EmployeeDTO searchEmpId(String code, String name) {
        Employee employee = repo.findEmployeeByCodeOrName(code, name);
        if (employee == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(employee, EmployeeDTO.class);
      }

    @Override
    public ArrayList<EmployeeDTO> loadAllEmployee() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Employee>>() {
     }.getType());
    }

    @Override
    public CustomDTO EmployeeIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
//        Employee firstByOrderByEmployeeCodeDesc = repo.findFirstByOrderByEmployeeIdDesc();
//        return (firstByOrderByEmployeeCodeDesc!=null)?
//                String.format("Emp-%03d" , Integer.parseInt(firstByOrderByEmployeeCodeDesc.getCode().replace("Emp-",""))+1): "Emp-001";

    }

    @Override
    public CustomDTO getSumEmployee() {

        return new CustomDTO(repo.getSumEmployee());
    }

    @Override
    public Integer getTotalEmployeeCount() {
        return repo.totalEmployeeCount();
    }
}

package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.CustomerDTO;
import lk.ijse.gdse66.spring.dto.SupplierDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SupplierService {
    void saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String id);
    SupplierDTO searchSupId(String code, String name);
    ArrayList<SupplierDTO> loadAllSupplier();
    SupplierDTO searchSupId(String id);

    @ResponseBody
    CustomDTO supplierIdGenerate();
    SupplierDTO getSumSupplier();
}

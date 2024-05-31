package lk.ijse.gdse66.spring.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.CustomerDTO;
import lk.ijse.gdse66.spring.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.dto.ItemDTO;
import lk.ijse.gdse66.spring.entity.Customer;
import lk.ijse.gdse66.spring.entity.Employee;
import lk.ijse.gdse66.spring.entity.Item;
import lk.ijse.gdse66.spring.repo.ItemRepo;
import lk.ijse.gdse66.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveItem(ItemDTO dto) {
        if (repo.existsById(dto.getCode())) {
            throw new RuntimeException("Item Already Exist. Please enter another id..!");
        }
        repo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (!repo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! ItemCode : "+ dto.getCode());
        }
        repo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void deleteItem(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(id);
    }

    @Override
    public ItemDTO searchItemId(String code, String name) {
        Item item = repo.findEmployeeByCodeOrName(code, name);
        if (item == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(item, ItemDTO.class);
    }

  /*  @Override
    public ItemDTO searchItemId(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(id).get(),ItemDTO.class);
    }*/

    @Override
    public ArrayList<ItemDTO> loadAllItem() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Item>>() {
        }.getType());
    }

    @Override
    public ItemDTO searchItemId(String code) {
        Optional<Item> item = repo.findById(code);
        if (item == null) {
            throw new RuntimeException("supplier not found with code: " + code);
        }
        return mapper.map(item, ItemDTO.class);
    }


    @Override
    public CustomDTO getSumItem() {
         return new CustomDTO(repo.getSumItem());
    }

    @Override
    public Integer getTotalItemCount() {
        return repo.totalItemCount();
    }
}

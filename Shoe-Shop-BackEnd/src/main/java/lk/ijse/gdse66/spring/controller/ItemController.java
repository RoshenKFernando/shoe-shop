package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomerDTO;
import lk.ijse.gdse66.spring.dto.ItemDTO;
import lk.ijse.gdse66.spring.entity.Supplier;
import lk.ijse.gdse66.spring.service.ItemService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllItem() {
        return new ResponseUtil("200", "Successfully Loaded. :", itemService.loadAllItem());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveItem(@ModelAttribute ItemDTO itemDTO) {
       /* System.out.println(itemDTO.toString());
        itemService.saveItem(itemDTO);
        return new ResponseUtil("200", "Successfully Registered.!", null);*/
        System.out.println(itemDTO.toString());

        // Check if the supplier object is null
        if(itemDTO.getSupplier() == null) {
            return new ResponseUtil("500", "Supplier information is missing!", null);
        }

        // Retrieve supplier information from the DTO
        String supplierId = itemDTO.getSupplier().getCode();
        String supName = itemDTO.getSupName();

        // Create a new Supplier entity
        Supplier supplier = new Supplier();
        supplier.setCode(supplierId);
        supplier.setName(supName);

        // Set the Supplier entity back to the ItemDTO
        itemDTO.setSupplier(supplier);

        // Save the item
        itemService.saveItem(itemDTO);
        return new ResponseUtil("200", "Successfully Registered.!",null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateItem(@ModelAttribute ItemDTO itemDTO) {
        itemService.updateItem(itemDTO);
        return new ResponseUtil("200", "Successfully Updated. :" + itemDTO.getCode(), null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteItem(@RequestParam String code) {
        itemService.deleteItem(code);
        return new ResponseUtil("200", "Successfully Deleted. :" + code, null);
    }


    @GetMapping(path = "/searchItem")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemDTO searchItemId(@RequestParam String code, @RequestParam String name){
        return itemService.searchItemId(code, name); // Adjusted method call
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchItemId")
    public ItemDTO searchItemId(String code){
        return itemService.searchItemId(code);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalItemCount() {
        return itemService.getTotalItemCount();
     }


}


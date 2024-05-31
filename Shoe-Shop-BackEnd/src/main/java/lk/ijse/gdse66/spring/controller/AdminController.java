package lk.ijse.gdse66.spring.controller;


import lk.ijse.gdse66.spring.dto.AdminPanelDTO;
import lk.ijse.gdse66.spring.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/panel")
@CrossOrigin
public class AdminController {

    @Autowired
    private SaleService service;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public AdminPanelDTO getAdminPanel(){
        return service.getAdminPanelDetails();
  }
}

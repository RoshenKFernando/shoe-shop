package lk.ijse.gdse66.spring.controller;

import lk.ijse.gdse66.spring.dto.CustomDTO;
import lk.ijse.gdse66.spring.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.dto.SalesDTO;
import lk.ijse.gdse66.spring.service.SaleService;
import lk.ijse.gdse66.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sales")
public class SalesController {

    @Autowired
    private SaleService service;


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/OrderIdGenerate")
    public @ResponseBody CustomDTO OrderIdGenerate(){
        return service.OrderIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil placeOrder(@RequestBody SalesDTO dto) {
        System.out.println(dto.toString());
        service.placeOrder(dto);
        return new ResponseUtil("Ok", "Successfully Purchased.!", null);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrders")
    public ResponseUtil LoadOrders() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.LoadOrders());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrderDetails")
    public ResponseUtil LoadOrderDetails() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.LoadOrderDetails());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/TodayOrders")
    public ResponseUtil getTodayOrders() {
        List<SalesDTO> todayOrders = service.getTodayCount();
        return new ResponseUtil("OK", "Today's orders loaded successfully.", todayOrders);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalSalecount() {
        return service.totalSalesCount();
       }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{code}")
    public ResponseUtil returnFullOrder(@PathVariable("code")String code){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned", service.returnFullOrder(code));

    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/loadData")
    public ResponseUtil loadOrderReturn(){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                service.loadReturnOrders());
}

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{code}")
    public ResponseUtil orderCanBeReturned(@PathVariable("code") String code){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                service.canBeReturned(code));
  }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/returnOneOrder")
    public ResponseUtil returnOneItemOrder(@RequestBody SaleDetailsDTO saleDetailsDTO){
        System.out.println(saleDetailsDTO);
        service.returnOneOrder(saleDetailsDTO);
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",null);

}

}

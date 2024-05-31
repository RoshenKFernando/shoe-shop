package lk.ijse.gdse66.spring.repo;

import lk.ijse.gdse66.spring.entity.SaleDetails;
import lk.ijse.gdse66.spring.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface SaleDetailsRepo extends JpaRepository<SaleDetails, String> {

    @Query(value = "SELECT sd.item_code AS itemCode, SUM(sd.qty) AS totalQuantity " +
            "FROM sale_details sd " +
            "GROUP BY sd.item_code " +
            "ORDER BY totalQuantity DESC " +
            "LIMIT 1", nativeQuery = true)
    Map<String, Object> findMostPurchasedItem();


    @Query("SELECT SUM(sd.itmTotal) FROM SaleDetails sd")
    Double getItmTotal();

    @Query("SELECT SUM(sd.items.buyPrice * sd.qty) AS totalCost FROM SaleDetails sd")
    Map<String, Object> getTotalCost();

    List<SaleDetails> findAllBySale(Sales sales);

    List<SaleDetails> findAllByStatus(String status);

    boolean existsByOidAndItemCode(String oid,String itemCode);

    SaleDetails findByOidAndItemCode(String oid,String itemCode);

    List<SaleDetails> findAllByOid(String oid);
}

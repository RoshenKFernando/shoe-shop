package lk.ijse.gdse66.spring.repo;

import lk.ijse.gdse66.spring.entity.Item;
import lk.ijse.gdse66.spring.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupplierRepo extends JpaRepository<Supplier,String> {

    @Query(value = "SELECT code FROM supplier ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(code) FROM supplier", nativeQuery = true)
    int getSumEmployee();

    @Query(value = "SELECT * FROM supplier s WHERE s.code = :code OR s.name = :name", nativeQuery = true)
    Supplier findEmployeeByCodeOrName(@Param("code") String code, @Param("name") String name);
}

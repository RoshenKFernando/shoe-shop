package lk.ijse.gdse66.spring.repo;


import lk.ijse.gdse66.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ItemRepo extends JpaRepository<Item, String> {

    @Query(value = "SELECT COUNT(code) FROM item", nativeQuery = true)
    int getSumItem();

    @Query(value = "SELECT * FROM item i WHERE i.code = :code OR i.name = :name", nativeQuery = true)
    Item findEmployeeByCodeOrName(@Param("code") String code, @Param("name") String name);

    @Query(value ="SELECT COUNT(c) FROM Item c")
    Integer totalItemCount();

    Item findByCode(String id);

}

package lk.ijse.gdse66.spring.repo;

import lk.ijse.gdse66.spring.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepo extends JpaRepository<Employee, String> {


//    Employee findFirstByOrderByEmployeeIdDesc();


    @Query(value = "SELECT code FROM employee ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(code) FROM employee", nativeQuery = true)
    int getSumEmployee();

    @Query(value = "SELECT * FROM employee e WHERE e.code = :code OR e.name = :name", nativeQuery = true)
    Employee findEmployeeByCodeOrName(@Param("code") String code, @Param("name") String name);

    @Query(value ="SELECT COUNT(e) FROM Employee e")
    Integer totalEmployeeCount();

}


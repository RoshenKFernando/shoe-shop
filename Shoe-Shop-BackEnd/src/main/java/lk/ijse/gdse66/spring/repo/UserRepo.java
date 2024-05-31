package lk.ijse.gdse66.spring.repo;


import lk.ijse.gdse66.spring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {
    Optional<User> findByEmail(String email);

    void deleteByEmail(String email);

    @Query(value = "SELECT * FROM customer c WHERE  c.name = :name", nativeQuery = true)
    User findUserByName( @Param("name") String name);

}

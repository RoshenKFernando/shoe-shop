package lk.ijse.gdse66.spring.service;

import lk.ijse.gdse66.spring.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService {
    UserDetailsService userDetailService();
    UserDTO searchUser(String id);
    void updateUser(UserDTO dto);
    void deleteUser(UserDTO dto);
}

package lk.ijse.gdse66.spring.service.impl;

import lk.ijse.gdse66.spring.dto.UserDTO;
import lk.ijse.gdse66.spring.entity.User;
import lk.ijse.gdse66.spring.repo.UserRepo;
import lk.ijse.gdse66.spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                                "user not found"));
    }
    @Override
    public UserDTO searchUser(String id){
        return (UserDTO) userRepo.findByEmail(id)
                .map(user -> mapper.map(user, UserDTO.class)
                )
                .orElseThrow(() -> new RuntimeException("User Not Exist"));
    }

    @Override
    public void updateUser(UserDTO dto) {
        userRepo.findByEmail(dto.getEmail()).ifPresentOrElse(
                user -> {
                    userRepo.save(new User(user.getId(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), dto.getRole()));
                },
                () -> {
                    throw new RuntimeException("User Not Exist");
                });
    }
    @Override
    public void deleteUser(UserDTO dto) {
        userRepo.findByEmail(dto.getEmail()).ifPresentOrElse(
                user -> {
                    userRepo.deleteByEmail(dto.getEmail());
                },
                () -> {
                    throw new RuntimeException("User Not Exist");
                }
                );
    }
}

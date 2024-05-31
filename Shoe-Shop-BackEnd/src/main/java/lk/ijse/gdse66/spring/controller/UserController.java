package lk.ijse.gdse66.spring.controller;
import lk.ijse.gdse66.spring.auth.request.SignInRequest;
import lk.ijse.gdse66.spring.auth.request.SignUpRequest;
import lk.ijse.gdse66.spring.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.spring.dto.CustomerDTO;
import lk.ijse.gdse66.spring.dto.UserDTO;
import lk.ijse.gdse66.spring.repo.UserRepo;
import lk.ijse.gdse66.spring.service.AuthenticationService;
import lk.ijse.gdse66.spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public UserDTO getUser(@PathVariable("id") String id) {
        return userService.searchUser(id);
    }

    @PutMapping(path = "/user")
    public ResponseEntity<Void> updateUser(@RequestBody UserDTO dto) {
        System.out.println(dto.toString());
        userService.updateUser(dto);
        return ResponseEntity.noContent().build();
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/user")
    public ResponseEntity<Void> deleteUser(@RequestBody UserDTO dto) {
        userService.deleteUser(dto);
        return ResponseEntity.noContent().build();
      }
}

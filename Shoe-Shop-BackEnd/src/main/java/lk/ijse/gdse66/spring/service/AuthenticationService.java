package lk.ijse.gdse66.spring.service;


import lk.ijse.gdse66.spring.auth.request.SignInRequest;
import lk.ijse.gdse66.spring.auth.request.SignUpRequest;
import lk.ijse.gdse66.spring.auth.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}

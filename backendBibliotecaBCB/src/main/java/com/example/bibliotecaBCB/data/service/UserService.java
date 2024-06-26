package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.UserDTO;
import com.example.bibliotecaBCB.data.entity.User;
import com.example.bibliotecaBCB.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long getUserIdByUserEmail(String email){
        if(userRepository.findByEmail(email).isPresent())
            return userRepository.findByEmail(email).get().getId();
        else
            return null;
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public List<UserDTO> getUserNamesAndIds(){
        List<UserDTO> userDTOS = new ArrayList<>();
        List<User> users = userRepository.findAll();
        for(User user: users){
            UserDTO userDTO = new UserDTO(user);
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }
}

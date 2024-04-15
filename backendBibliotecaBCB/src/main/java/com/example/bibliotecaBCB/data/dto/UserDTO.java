package com.example.bibliotecaBCB.data.dto;

import com.example.bibliotecaBCB.data.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;

    public UserDTO(User user) {
        this.id = user.getId();;
        this.name = user.getUsername();
    }
}

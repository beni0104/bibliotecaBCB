package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.dto.BookDTO;
import com.example.bibliotecaBCB.data.dto.LoanRequestDTO;
import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.entity.UserFavorites;
import com.example.bibliotecaBCB.data.service.LoanRequestService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/loanRequest")
public class LoanRequestController {
    private final LoanRequestService loanRequestService;
    private final JwtUtils jwtUtils;

    public LoanRequestController(LoanRequestService loanRequestService, JwtUtils jwtUtils) {
        this.loanRequestService = loanRequestService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<LoanRequestDTO>> getAllLoanRequests(){
        List<LoanRequest> loanRequestList = loanRequestService.findAll();
        List<LoanRequestDTO> loanRequestDTOList = loanRequestList.stream().map(LoanRequestDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(loanRequestDTOList);
    }

    @GetMapping("/getforauthuser")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<LoanRequestDTO>> getLoanRequestsForAuthenticatedUser(@RequestHeader(value="Authorization") String token){
        Long userId = jwtUtils.extractUserIdFromJWT(token);
        if(userId != null){
            List<LoanRequest> loanRequestList = loanRequestService.getByUserId(userId);
            List<LoanRequestDTO> loanRequestDTOList = loanRequestList.stream().map(LoanRequestDTO::new).collect(Collectors.toList());
            return ResponseEntity.ok(loanRequestDTOList);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/create")
    public ResponseEntity<LoanRequestDTO> createLoanRequest(@RequestBody LoanRequestDTO loanRequestDTO){
         return ResponseEntity.ok(loanRequestService.create(loanRequestDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<LoanRequestDTO> updateLoanRequest(@RequestBody LoanRequestDTO loanRequestDTO){
        return ResponseEntity.ok(loanRequestService.update(loanRequestDTO));
    }
}

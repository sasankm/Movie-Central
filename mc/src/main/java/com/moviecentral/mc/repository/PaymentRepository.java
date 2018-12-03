package com.moviecentral.mc.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.moviecentral.mc.entity.Payment;


public interface PaymentRepository extends  JpaRepository<Payment, Integer>{
//Payment findbyId(Integer id);
}

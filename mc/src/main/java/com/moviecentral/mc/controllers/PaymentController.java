package com.moviecentral.mc.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.Payment;
import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.models.PaymentRequest;
import com.moviecentral.mc.models.PaymentResponse;
import com.moviecentral.mc.repository.PaymentRepository;
import com.moviecentral.mc.repository.UserRepository;


@RestController

public class PaymentController {

	
@Autowired
public PaymentRepository paymentRepository;
@Autowired

public UserRepository userRepository;
Payment payment=new Payment();
@PostMapping(value="/payment")
@CrossOrigin(origins ="http://localhost:3000")
public PaymentResponse makePayment(@RequestBody PaymentRequest req){
	System.out.println("req at backend type "+req.getType());
	System.out.println("req at backend date "+req.getDate());
	System.out.println("req at backend movieid "+req.getMovieid());
	System.out.println("req at backend username "+req.getUsername());
	System.out.println("req at backend amount "+req.getAmount());
	System.out.println("req at backend expdate "+req.getExpirydate());
	 String username=req.getUsername();
	 Integer userid=req.getUserid();
	 Integer movieid=req.getMovieid();
	String type=req.getType();
	java.sql.Date date=req.getDate();
	Integer amount=req.getAmount();
	java.sql.Date startdate=req.getStartdate();
	
	
	if(userid.equals(null)){
		return new PaymentResponse("FAILURE", "EMPTY_USERID");
	}
	
	payment.setUserid(userid);
	
	payment.setMovieid(movieid);
	
	payment.setType(type);
	
	payment.setDate(date);
	
	payment.setAmount(amount);
	
	
	
	paymentRepository.save(payment);
	
	 System.out.println("payment variable of save ");
	 
	 User user=userRepository.findByUsername(username);
	
	System.out.println("user in payment is "+user.getUserid());
	Integer sub=user.getSubscription();
	if (type.equals("subscription")) {
		
		user.setSubscription(1);
	}
	else {
		user.setSubscription(0);
	}
	user.setEndDate(req.getExpirydate());
	if (sub!=1) {
		
		user.setStartDate(req.getStartdate());
	}
	
	
	userRepository.save(user);
	
	 return new PaymentResponse("SUCCESS", "payment done");
	
	
	
	
	
	
	
}
}

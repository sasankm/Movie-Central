package com.moviecentral.mc.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	@Id
    @GeneratedValue
    private Integer userid;
	private String username;
	private String email;
	private String type;
	private String password;
	Integer subscription;
	Integer activated;
	String code;
	java.sql.Date startdate;
	java.sql.Date enddate;
	
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getSubscription() {
		return subscription;
	}
	public void setSubscription(Integer subscription) {
		this.subscription = subscription;
	}
	public Integer getActivated() {
		return activated;
	}
	public void setActivated(Integer activation) {
		this.activated = activation;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public java.sql.Date getStartDate() {
		return startdate;
	}
	public void setStartDate(java.sql.Date startDate) {
		this.startdate = startDate;
	}
	public java.sql.Date getEndDate() {
		return enddate;
	}
	public void setEndDate(java.sql.Date endDate) {
		this.enddate = endDate;
	}
	
	
}

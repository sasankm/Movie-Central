package com.moviecentral.mc.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "attributes")
public class Attributes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer attributesid;
	private String value;
	
	public Integer getAttributesid() {
		return attributesid;
	}
	public void setAttributesid(Integer attributesid) {
		this.attributesid = attributesid;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
}

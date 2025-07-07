package com.codewithjj.wasteless.items.models;



import jakarta.persistence.Embeddable;

import java.io.Serializable; // Good practice for POJOs stored in entities
@Embeddable
public class LocationData implements Serializable {
    private Double latitude;
    private Double longitude;
    private String address; // Optional additional fields
    private String city;
    private Double accuracy;

    // Default constructor is important for deserialization
    public LocationData() {}

    public LocationData(Double latitude, Double longitude, String address, String city, Double accuracy) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.city = city;
        this.accuracy=accuracy;
    }

    // Getters and Setters (important for Jackson serialization/deserialization)
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public Double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(Double accuracy) {
        this.accuracy = accuracy;
    }
    @Override
    public String toString() {
        return "LocationData{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", accuracy='" + city + '\'' +
                '}';
    }
}

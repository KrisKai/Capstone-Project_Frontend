const typeForConverting = [
  { name: "accounting", code: "Kế toán" },
  { name: "airport", code: "Sân bay" },
  { name: "amusement_park", code: "Công viên giải trí" },
  { name: "aquarium", code: "Thủy cung" },
  { name: "art_gallery", code: "Phòng trưng bày nghệ thuật" },
  { name: "atm", code: "Máy ATM" },
  { name: "bakery", code: "Tiệm bánh mỳ" },
  { name: "bank", code: "Ngân hàng" },
  { name: "bar", code: "Quán bar" },
  { name: "beauty_salon", code: "Tiệm làm đẹp" },
  { name: "bicycle_store", code: "Cửa hàng xe đạp" },
  { name: "book_store", code: "Cửa hàng sách" },
  { name: "bowling_alley", code: "Sân bowling" },
  { name: "bus_station", code: "Trạm xe buýt" },
  { name: "cafe", code: "Quán cà phê" },
  { name: "campground", code: "Khu cắm trại" },
  { name: "car_dealer", code: "Đại lý ô tô" },
  { name: "car_rental", code: "Cho thuê ô tô" },
  { name: "car_repair", code: "Sửa chữa ô tô" },
  { name: "car_wash", code: "Rửa xe" },
  { name: "casino", code: "Sòng bạc" },
  { name: "cemetery", code: "Nghĩa trang" },
  { name: "church", code: "Nhà thờ" },
  { name: "city_hall", code: "Tòa thị chính" },
  { name: "clothing_store", code: "Cửa hàng quần áo" },
  { name: "convenience_store", code: "Cửa hàng tiện lợi" },
  { name: "courthouse", code: "Tòa án" },
  { name: "dentist", code: "Nha sĩ" },
  { name: "department_store", code: "Cửa hàng bách hóa" },
  { name: "doctor", code: "Bác sĩ" },
  { name: "drugstore", code: "Hiệu thuốc" },
  { name: "electrician", code: "Thợ điện" },
  { name: "electronics_store", code: "Cửa hàng điện tử" },
  { name: "embassy", code: "Đại sứ quán" },
  { name: "fire_station", code: "Trạm cứu hỏa" },
  { name: "florist", code: "Tiệm hoa" },
  { name: "funeral_home", code: "Nhà tang lễ" },
  { name: "furniture_store", code: "Cửa hàng đồ nội thất" },
  { name: "gas_station", code: "Trạm xăng" },
  { name: "gym", code: "Phòng tập gym" },
  { name: "hair_care", code: "Tiệm làm tóc" },
  { name: "hardware_store", code: "Cửa hàng phụ kiện" },
  { name: "hindu_temple", code: "Chùa Hindu" },
  { name: "home_goods_store", code: "Cửa hàng đồ gia dụng" },
  { name: "hospital", code: "Bệnh viện" },
  { name: "insurance_agency", code: "Công ty bảo hiểm" },
  { name: "jewelry_store", code: "Cửa hàng trang sức" },
  { name: "laundry", code: "Tiệm giặt ủi" },
  { name: "lawyer", code: "Luật sư" },
  { name: "library", code: "Thư viện" },
  { name: "light_rail_station", code: "Trạm xe điện" },
  { name: "liquor_store", code: "Cửa hàng rượu" },
  { name: "local_government_office", code: "Văn phòng chính quyền địa phương" },
  { name: "locksmith", code: "Thợ sửa khóa" },
  { name: "lodging", code: "Nơi lưu trú" },
  { name: "meal_delivery", code: "Giao đồ ăn" },
  { name: "meal_takeaway", code: "Mua đồ ăn mang đi" },
  { name: "mosque", code: "Nhà thờ Hồi giáo" },
  { name: "movie_rental", code: "Cho thuê phim" },
  { name: "movie_theater", code: "Rạp chiếu phim" },
  { name: "moving_company", code: "Công ty chuyển nhà" },
  { name: "museum", code: "Bảo tàng" },
  { name: "night_club", code: "Quán bar" },
  { name: "painter", code: "Họa sĩ" },
  { name: "park", code: "Công viên" },
  { name: "parking", code: "Bãi đỗ xe" },
  { name: "pet_store", code: "Cửa hàng thú cưng" },
  { name: "pharmacy", code: "Nhà thuốc" },
  { name: "physiotherapist", code: "Bác sĩ vật lý trị liệu" },
  { name: "plumber", code: "Thợ sửa ống nước" },
  { name: "police", code: "Cảnh sát" },
  { name: "post_office", code: "Bưu điện" },
  { name: "primary_school", code: "Trường tiểu học" },
  { name: "real_estate_agency", code: "Công ty bất động sản" },
  { name: "restaurant", code: "Nhà hàng" },
  { name: "roofing_contractor", code: "Nhà thầu lợp mái" },
  { name: "rv_park", code: "Khu trung chuyển xe du lịch" },
  { name: "school", code: "Trường học" },
  { name: "secondary_school", code: "Trường trung học" },
  { name: "shoe_store", code: "Cửa hàng giày dép" },
  { name: "shopping_mall", code: "Trung tâm mua sắm" },
  { name: "spa", code: "Spa" },
  { name: "stadium", code: "Sân vận động" },
  { name: "storage", code: "Kho lưu trữ" },
  { name: "store", code: "Cửa hàng" },
  { name: "subway_station", code: "Trạm tàu điện ngầm" },
  { name: "supermarket", code: "Siêu thị" },
  { name: "synagogue", code: "Hồi giáo giáo đường" },
  { name: "taxi_stand", code: "Bến xe taxi" },
  { name: "tourist_attraction", code: "Địa điểm du lịch" },
  { name: "train_station", code: "Ga tàu" },
  { name: "transit_station", code: "Trạm chuyển tiếp" },
  { name: "travel_agency", code: "Công ty du lịch" },
  { name: "university", code: "Đại học" },
  { name: "veterinary_care", code: "Chăm sóc thú y" },
  { name: "zoo", code: "Sở thú" },
  { name: "administrative_area_level_1", code: "Mức quản lý hành chính 1" },
  { name: "administrative_area_level_2", code: "Mức quản lý hành chính 2" },
  { name: "administrative_area_level_3", code: "Mức quản lý hành chính 3" },
  { name: "administrative_area_level_4", code: "Mức quản lý hành chính 4" },
  { name: "administrative_area_level_5", code: "Mức quản lý hành chính 5" },
  { name: "administrative_area_level_6", code: "Mức quản lý hành chính 6" },
  { name: "administrative_area_level_7", code: "Mức quản lý hành chính 7" },
  { name: "archipelago", code: "Quần đảo" },
  { name: "colloquial_area", code: "Khu vực thông tục" },
  { name: "continent", code: "Lục địa" },
  { name: "country", code: "Quốc gia" },
  { name: "establishment", code: "Cơ sở" },
  { name: "finance", code: "Tài chính" },
  { name: "floor", code: "Tầng" },
  { name: "food", code: "Thức ăn" },
  { name: "general_contractor", code: "Nhà thầu" },
  { name: "geocode", code: "Mã địa lý" },
  { name: "health", code: "Sức khỏe" },
  { name: "intersection", code: "Ngã tư" },
  { name: "landmark", code: "Địa điểm nổi tiếng" },
  { name: "locality", code: "Địa phương" },
  { name: "natural_feature", code: "Đặc điểm tự nhiên" },
  { name: "neighborhood", code: "Khu phố" },
  { name: "place_of_worship", code: "Nơi thờ cúng" },
  { name: "plus_code", code: "Mã Plus" },
  { name: "point_of_interest", code: "Điểm quan tâm" },
  { name: "political", code: "khu vực Chính trị" },
  { name: "post_box", code: "Hộp thư" },
  { name: "postal_code", code: "Mã bưu điện" },
  { name: "postal_code_prefix", code: "Tiền tố mã bưu điện" },
  { name: "postal_code_suffix", code: "Hậu tố mã bưu điện" },
  { name: "postal_town", code: "Thị trấn bưu điện" },
  { name: "premise", code: "Cơ sở" },
  { name: "room", code: "Phòng" },
  { name: "route", code: "Tuyến đường" },
  { name: "street_address", code: "Địa chỉ đường" },
  { name: "street_number", code: "Số nhà trên đường" },
  { name: "sublocality", code: "Phường xã" },
  { name: "sublocality_level_1", code: "Phường xã mức 1" },
  { name: "sublocality_level_2", code: "Phường xã mức 2" },
  { name: "sublocality_level_3", code: "Phường xã mức 3" },
  { name: "sublocality_level_4", code: "Phường xã mức 4" },
  { name: "sublocality_level_5", code: "Phường xã mức 5" },
  { name: "subpremise", code: "Phòng cơ sở" },
  { name: "town_square", code: "Quảng trường thành phố" },
];
export default typeForConverting;
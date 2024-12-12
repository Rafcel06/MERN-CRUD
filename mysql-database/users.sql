-- Paste the query below to your Mysql Xampp


-- Table structure for table `users`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `archived` int(11) DEFAULT 0,
  `inactive` int(11) DEFAULT 0,
  `archived_by` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_inserted` datetime DEFAULT NULL,
  `dt_updated` datetime DEFAULT NULL,
  `dt_deleted` datetime DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



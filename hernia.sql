-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 06:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hernia`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminlogin`
--

CREATE TABLE `adminlogin` (
  `id` int(10) NOT NULL,
  `user` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminlogin`
--

INSERT INTO `adminlogin` (`id`, `user`, `pass`) VALUES
(1, 'admin101', '5555');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(10) NOT NULL,
  `date` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `patid` varchar(60) NOT NULL,
  `did` varchar(60) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `time`, `patid`, `did`, `status`) VALUES
(11, '2024-09-11', '8:44 PM', '6555', '192111538', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `consult_notes`
--

CREATE TABLE `consult_notes` (
  `id` int(10) NOT NULL,
  `reg` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pid` varchar(50) NOT NULL,
  `poday` varchar(50) NOT NULL,
  `genexm` varchar(50) NOT NULL,
  `bp` varchar(50) NOT NULL,
  `pulse` varchar(50) NOT NULL,
  `temp` varchar(50) NOT NULL,
  `rr` varchar(50) NOT NULL,
  `spo2` varchar(50) NOT NULL,
  `drain` varchar(50) NOT NULL,
  `inpout` varchar(50) NOT NULL,
  `pallor` varchar(50) NOT NULL,
  `clublym` varchar(50) NOT NULL,
  `pa` varchar(50) NOT NULL,
  `rs` varchar(50) NOT NULL,
  `cvs` varchar(50) NOT NULL,
  `cns` varchar(50) NOT NULL,
  `locexm` varchar(50) NOT NULL,
  `diag` varchar(50) NOT NULL,
  `abx` varchar(50) NOT NULL,
  `spi_h2` varchar(50) NOT NULL,
  `analg` varchar(50) NOT NULL,
  `antipy` varchar(50) NOT NULL,
  `stool` varchar(50) NOT NULL,
  `local` varchar(50) NOT NULL,
  `thyroid` varchar(50) NOT NULL,
  `invest` varchar(50) NOT NULL,
  `advice` varchar(50) NOT NULL,
  `regnum` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consult_notes`
--

INSERT INTO `consult_notes` (`id`, `reg`, `name`, `pid`, `poday`, `genexm`, `bp`, `pulse`, `temp`, `rr`, `spo2`, `drain`, `inpout`, `pallor`, `clublym`, `pa`, `rs`, `cvs`, `cns`, `locexm`, `diag`, `abx`, `spi_h2`, `analg`, `antipy`, `stool`, `local`, `thyroid`, `invest`, `advice`, `regnum`) VALUES
(1, '192111479', 'Jeevan', '6555', '4', 'Yes', '78', '120', '98', '20', '13', 'Yes', 'Good', 'Pallor', 'Clubbing', 'P', 'Served', 'Drain', 'Cns', 'Done', 'Yes', 'Ppm', 'Blockers', 'DBs', 'Breath', 'Yes ', 'Done', 'Medicine', 'Yes', 'Take leafy vegetables ', '6555');

-- --------------------------------------------------------

--
-- Table structure for table `doctorlogin`
--

CREATE TABLE `doctorlogin` (
  `id` int(10) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `DOB` varchar(20) NOT NULL,
  `Age` varchar(20) NOT NULL,
  `Sex` varchar(20) NOT NULL,
  `Qualification` varchar(60) NOT NULL,
  `Registration Number` varchar(20) NOT NULL,
  `Email-Id` varchar(20) NOT NULL,
  `Mobile Number` varchar(20) NOT NULL,
  `Home Address` varchar(150) NOT NULL,
  `WorkPlace` varchar(150) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `dpic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctorlogin`
--

INSERT INTO `doctorlogin` (`id`, `Name`, `DOB`, `Age`, `Sex`, `Qualification`, `Registration Number`, `Email-Id`, `Mobile Number`, `Home Address`, `WorkPlace`, `pass`, `dpic`) VALUES
(9, 'Praneeth', '12-06-1979', '48', 'Male', 'MBBS', '192111479', 'pan@gmail.com', '9701201428', 'Vizag', 'Chennai', '1479', '5898d379-8a06-46b9-8d5d-6b05235f6d9a.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `not_treated`
--

CREATE TABLE `not_treated` (
  `id` int(10) NOT NULL,
  `pid` varchar(50) NOT NULL,
  `comp` varchar(200) NOT NULL,
  `pic` varchar(100) NOT NULL,
  `dname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `not_treated`
--

INSERT INTO `not_treated` (`id`, `pid`, `comp`, `pic`, `dname`) VALUES
(1, '1100', 'Pain', 'e3b8edd1-ebca-42ee-b37e-9db5352f3d0e.jpeg', '192111478');

-- --------------------------------------------------------

--
-- Table structure for table `patientlogin`
--

CREATE TABLE `patientlogin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` int(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `mob` varchar(15) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `patid` int(11) DEFAULT NULL,
  `pass` varchar(10) NOT NULL,
  `cpass` varchar(10) NOT NULL,
  `Registration Number` varchar(20) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patientlogin`
--

INSERT INTO `patientlogin` (`id`, `name`, `age`, `gender`, `address`, `mob`, `mail`, `patid`, `pass`, `cpass`, `Registration Number`, `image`) VALUES
(1, 'Kumar', 18, 'Male', 'Chennai', '9701201425', 'pani@gmail.com', 6555, '1234', '1234', '192111479', '66793b851c6e7.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(10) NOT NULL,
  `patid` varchar(50) NOT NULL,
  `docid` varchar(50) NOT NULL,
  `cpic` varchar(100) NOT NULL,
  `lpic` varchar(100) NOT NULL,
  `rpic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `patid`, `docid`, `cpic`, `lpic`, `rpic`) VALUES
(5, '6555', '192111479', '66cd892660d79_cpic.jpeg', '66cd892660d7d_lpic.jpeg', '66cd892660d7e_rpic.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `treated_patients`
--

CREATE TABLE `treated_patients` (
  `id` int(10) NOT NULL,
  `pid` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `comp` varchar(200) NOT NULL,
  `comps` varchar(200) NOT NULL,
  `pic` varchar(100) NOT NULL,
  `dname` varchar(100) NOT NULL,
  `did` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treated_patients`
--

INSERT INTO `treated_patients` (`id`, `pid`, `date`, `comp`, `comps`, `pic`, `dname`, `did`) VALUES
(1, '1100', '2024-07-23', 'Pain in the back', '[\"Fever\",\"Nausea\",\"Vomiting\"]', '669ea0f017f1a_pic.jpeg', 'Hari Krishna ', '192111856');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminlogin`
--
ALTER TABLE `adminlogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consult_notes`
--
ALTER TABLE `consult_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctorlogin`
--
ALTER TABLE `doctorlogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `not_treated`
--
ALTER TABLE `not_treated`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patientlogin`
--
ALTER TABLE `patientlogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treated_patients`
--
ALTER TABLE `treated_patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminlogin`
--
ALTER TABLE `adminlogin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `consult_notes`
--
ALTER TABLE `consult_notes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctorlogin`
--
ALTER TABLE `doctorlogin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `not_treated`
--
ALTER TABLE `not_treated`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `treated_patients`
--
ALTER TABLE `treated_patients`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

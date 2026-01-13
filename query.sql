USE linea;

INSERT INTO `users` (
  `id`,
  `name`,
  `email`,
  `password`,
  `subscription_status`,
  `created_at`,
  `updated_at`,
  `email_notifications`,
  `push_notifications`,
  `sms_notifications`
) VALUES (
  1,
  'admin',
  'admin@gmail.com',
  '$2a$10$8KzS88B46SPr.m.Xf.M0IuY49N98Xz.z5j/j3mOQ.6jS5x.z5z5z5',
  'FREE',
  NOW(),
  NOW(),
  TRUE,
  TRUE,
  FALSE
);


UPDATE `users`
SET `password` = '$2b$10$2vd6Q9Rl.LQ1s/okCMgS4.0jK0s6mznh0Z3WuHrzG/5SQcN3LbCC2'
WHERE `email` = 'admin@gmail.com';


use linea;
INSERT INTO currencies (id, code, name, symbol, decimals, created_at, updated_at)
VALUES
  (UUID(), 'USD', 'US Dollar', '$', 2, NOW(), NOW()),
  (UUID(), 'INR', 'Indian Rupee', '₹', 2, NOW(), NOW());
 
INSERT INTO `product` (`name`, `sku`, `basePrice`, `description`, `isActive`, `createdAt`, `updatedAt`) 
VALUES 
('SimpliRad™ RIS-PACS', 'SR-RIS-001', 1200.00, 'AI-enabled, cloud-based software for secure medical image management.', 1, NOW(), NOW()),
('SimpliConnect™', 'SR-CON-002', 450.00, 'Referral & EMR management with encrypted sharing and specialist collaboration.', 1, NOW(), NOW()),
('InnoHMS / Academics', 'SR-ACA-003', 300.00, 'Online academic platform for healthcare professional interactive learning.', 1, NOW(), NOW());


use linea;
INSERT INTO sub_products (id, product_id, name, baseRate, billingType, updatedAt)
VALUES ('sp_service_009', 3, 'Doctor Charge', 500.00, 'FIXED', NOW());



INSERT INTO Plan 
(id, name, code, description, price, currency, billingCycle, startDate, endDate, autoRenew, renewalPrice, status, createdAt, updatedAt) 
VALUES
(
  'ckxyz1234567890abcdef1235',
  'Basic Yearly',
  'BASICY',
  'This is the basic Yearly Plan',
  15000.99,
  'INR',
  'YEARLY',
  '2026-01-01 00:00:00',
  '2027-01-01 00:00:00',
  TRUE,
  1500.99,
  'ACTIVE',
  NOW(),
  NOW()
);
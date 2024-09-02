# SafeShare Backend

[Multiflex](https://github.com/vientorepublic/multiflex) based file storage server

# Requirements

- Node.js 20.x
- MySQL or MariaDB Database Server

# Key Featuers

- i18n support (en-US, ko-KR, zh-CN)
- Preview file information

# SQL Tables

- Files

```sql
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upload_at` varchar(255) NOT NULL,
  `original_filename` longtext NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `maximum_count` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

# Config

> [!NOTE]  
> Upload/Download services are created exclusively for each request by default. Selectively enable the `USE_CLUSTER` option if necessary.

Create `.env` and add below:

```
PORT=
UPLOAD_PATH=
EXPIRES=86400000
SIZE_LIMIT=1000000
FRONTEND_HOST=
RECAPTCHA_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

# License

This project is released under the MIT License.

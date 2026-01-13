<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "db_2_akbar";

    $conn = mysqli_connect($host, $username, $password, $database);
    if (!$conn) {
        die("Koneksi gagal: " . mysqli_connect_error());
    }

    if (isset($_POST['submit'])) {
        $id = $_POST['id'];
        $nama_barang = $_POST['nama_barang'];
        $jenis_barang = $_POST['jenis_barang'];
        $jumlah_barang = $_POST['jumlah_barang'];
        $lokasi_barang = $_POST['lokasi_barang'];

        $sql = "INSERT INTO `aset` (id, nama_barang, jenis_barang, jumlah_barang, lokasi_barang) 
                VALUES ('$id', '$nama_barang', '$jenis_barang', '$jumlah_barang', '$lokasi_barang')";

        if (mysqli_query($conn, $sql)) {
            echo "<script>alert('Data berhasil ditambahkan');</script>";
        } else {
            echo "<script>alert('Error: " . mysqli_error($conn) . "');</script>";
        }
    }

    if (isset($_POST['update'])) {
        $id = $_POST['id'];
        $nama_barang = $_POST['nama_barang'];
        $jenis_barang = $_POST['jenis_barang'];
        $jumlah_barang = $_POST['jumlah_barang'];
        $lokasi_barang = $_POST['lokasi_barang'];

        $sql = "UPDATE `aset` 
                SET nama_barang='$nama_barang', jenis_barang='$jenis_barang', 
                    jumlah_barang='$jumlah_barang', lokasi_barang='$lokasi_barang' 
                WHERE id='$id'";

        if (mysqli_query($conn, $sql)) {
            echo "<script>alert('Data berhasil diupdate');</script>";
            echo "<script>window.location.href = '".$_SERVER['PHP_SELF']."';</script>";
        } else {
            echo "<script>alert('Error: " . mysqli_error($conn) . "');</script>";
        }
    }

    if (isset($_GET['delete'])) {
        $id = $_GET['delete'];
        
        $sql = "DELETE FROM `aset` WHERE id='$id'";
        
        if (mysqli_query($conn, $sql)) {
            echo "<script>alert('Data berhasil dihapus');</script>";
            echo "<script>window.location.href = '".$_SERVER['PHP_SELF']."';</script>";
        } else {
            echo "<script>alert('Error: " . mysqli_error($conn) . "');</script>";
        }
    }

    $edit_data = null;
    if (isset($_GET['edit'])) {
        $id = $_GET['edit'];
        $sql_edit = "SELECT * FROM `aset` WHERE id='$id'";
        $result_edit = mysqli_query($conn, $sql_edit);
        if (mysqli_num_rows($result_edit) > 0) {
            $edit_data = mysqli_fetch_assoc($result_edit);
        }
    }

    $sql = "SELECT * FROM `aset` ORDER BY id DESC";
    $result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manajemen Aset</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Pendataan Aset</h1>

    <div>
        <h2>Input Data Aset</h2>

        <form action="" method="post">
            <label for="id">ID :</label>
            <input type="number" name="id" id="id" 
                value="<?php echo isset($edit_data) ? $edit_data['id'] : ''; ?>" 
                <?php echo isset($edit_data) ? 'readonly' : 'required'; ?>><br>

            <label for="nama_barang">Nama Barang :</label>
            <input type="text" name="nama_barang" id="nama_barang" 
                value="<?php echo isset($edit_data) ? $edit_data['nama_barang'] : ''; ?>" required><br>

            <label for="jenis_barang">Jenis Barang :</label>
            <input type="text" name="jenis_barang" id="jenis_barang" 
                value="<?php echo isset($edit_data) ? $edit_data['jenis_barang'] : ''; ?>" required><br>

            <label for="jumlah_barang">Jumlah Barang :</label>
            <input type="text" name="jumlah_barang" id="jumlah_barang" 
                value="<?php echo isset($edit_data) ? $edit_data['jumlah_barang'] : ''; ?>" required><br>
            
            <label for="lokasi_barang">Lokasi Barang :</label>
            <input type="text" name="lokasi_barang" id="lokasi_barang" 
                value="<?php echo isset($edit_data) ? $edit_data['lokasi_barang'] : ''; ?>" required><br>

            <?php if (isset($edit_data)): ?>
                <button type="submit" name="update">Update</button>
                <a href="?"><button type="button">Batal</button></a>
            <?php else: ?>
                <button type="submit" name="submit">Submit</button>
            <?php endif; ?>
        </form>
    </div>

    <div>
        <h2>Daftar Aset</h2>
        <?php if (mysqli_num_rows($result) > 0): ?>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Jumlah Barang</th>
                    <th>Lokasi Barang</th>
                    <th>Aksi</th>
                </tr>
                <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['nama_barang']; ?></td>
                    <td><?php echo $row['jenis_barang']; ?></td>
                    <td><?php echo $row['jumlah_barang']; ?></td>
                    <td><?php echo $row['lokasi_barang']; ?></td>
                    <td>
                        <a href="?edit=<?php echo $row['id']; ?>">Edit</a>
                        <a href="?delete=<?php echo $row['id']; ?>" onclick="return confirm('Yakin ingin menghapus data ini?')">Hapus</a>
                    </td>
                </tr>
                <?php endwhile; ?>
            </table>
        <?php else: ?>
            <p>Tidak ada data aset.</p>
        <?php endif; ?>
    </div>

    <script src="script.js"></script>
</body>
</html>

<?php
mysqli_close($conn);
?>
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getWorkshops, deleteWorkshop, addWorkshop } from '../../services/workshopService';
import { workshops as initialWorkshops } from '../../data/workshops'; // For migration

const AdminDashboard = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const data = await getWorkshops();
            setWorkshops(data);
        } catch (error) {
            console.error("Error fetching workshops:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error al salir:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás segura de borrar este taller? No se puede deshacer.')) {
            try {
                await deleteWorkshop(id);
                fetchWorkshops(); // Refresh list
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    const handleMigrate = async () => {
        if (window.confirm('Esto copiará los talleres del archivo local a la base de datos. ¿Continuar?')) {
            try {
                setLoading(true);
                for (const workshop of initialWorkshops) {
                    // Determine category based on hardcoded list
                    const workshopIds = ['dar-voz-a-tu-verdad', 'lealtades-familiares', 'universo-emociones'];
                    const category = workshopIds.includes(workshop.id) ? 'taller' : 'sesion';

                    // Flatten fullDescription if it's an array
                    const workshopData = {
                        ...workshop,
                        category,
                        fullDescription: Array.isArray(workshop.fullDescription)
                            ? workshop.fullDescription
                            : [workshop.fullDescription]
                    };
                    await addWorkshop(workshopData);
                }
                alert('Migración completada!');
                fetchWorkshops();
            } catch (error) {
                console.error("Migration error:", error);
                alert('Error en la migración');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Panel de Administración</h2>
                <div className="user-info">
                    <span>{currentUser?.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
                </div>
            </div>

            <div className="admin-content">
                <div className="actions-bar">
                    <button className="primary-btn" onClick={() => navigate('/admin/new')}>➕ Nuevo Taller</button>
                    {workshops.length === 0 && (
                        <button className="secondary-btn" onClick={handleMigrate}>🔄 Migrar Datos Iniciales</button>
                    )}
                </div>

                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="workshop-list">
                        {workshops.map(workshop => (
                            <div key={workshop.id} className="workshop-item">
                                <img src={workshop.image} alt={workshop.title} className="workshop-thumb" />
                                <div className="workshop-info">
                                    <h3>{workshop.title}</h3>
                                    <p className="short-desc">{workshop.shortDescription}</p>
                                </div>
                                <div className="workshop-actions">
                                    <button onClick={() => navigate(`/admin/edit/${workshop.id}`)} className="edit-btn">✏️</button>
                                    <button onClick={() => handleDelete(workshop.id)} className="delete-btn">🗑️</button>
                                </div>
                            </div>
                        ))}
                        {workshops.length === 0 && <p>No hay talleres cargados. Usá el botón de migrar o creá uno nuevo.</p>}
                    </div>
                )}
            </div>

            <style jsx="true">{`
        .admin-container {
          padding: 100px 20px 40px;
          max-width: 1000px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-main);
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }

        .actions-bar {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
        }

        .workshop-item {
            display: flex;
            align-items: center;
            background-color: var(--bg-card);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .workshop-thumb {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
            margin-right: 20px;
        }

        .workshop-info {
            flex: 1;
        }

        .short-desc {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-top: 5px;
        }

        .workshop-actions {
            display: flex;
            gap: 10px;
        }

        .edit-btn, .delete-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 5px;
        }
        
        .user-info {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .logout-btn {
            background-color: transparent;
            border: 1px solid var(--text-secondary);
            color: var(--text-secondary);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }

        .logout-btn:hover {
            color: var(--error, red);
            border-color: var(--error, red);
        }

        .primary-btn {
            background-color: var(--primary);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }

        .secondary-btn {
            background-color: transparent;
            border: 1px solid var(--primary);
            color: var(--primary);
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addWorkshop, updateWorkshop, getWorkshops } from '../../services/workshopService';

const WorkshopForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        fullDescription: '', // Will handle as string and split by lines if needed, or simple textarea
        image: '', // URL
        idealFor: '',
        ctaLink: '', // Optional
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            loadWorkshop();
        }
    }, [id]);

    const loadWorkshop = async () => {
        try {
            setLoading(true);
            const workshops = await getWorkshops();
            const workshop = workshops.find(w => w.id === id);
            if (workshop) {
                // fullDescription might be an array, join it for editing
                const desc = Array.isArray(workshop.fullDescription)
                    ? workshop.fullDescription.join('\n')
                    : workshop.fullDescription;

                // idealFor might be array
                const ideal = Array.isArray(workshop.idealFor)
                    ? workshop.idealFor.join('\n')
                    : workshop.idealFor;

                setFormData({
                    ...workshop,
                    fullDescription: desc,
                    idealFor: ideal,
                });
            }
        } catch (err) {
            console.error(err);
            setError('Error al cargar el taller');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Process data before saving
            const dataToSave = {
                ...formData,
                // Convert newlines to array for these fields if they are multi-line
                fullDescription: formData.fullDescription.split('\n').filter(line => line.trim() !== ''),
                idealFor: formData.idealFor.split('\n').filter(line => line.trim() !== ''),
            };

            if (isEditing) {
                await updateWorkshop(id, dataToSave);
            } else {
                await addWorkshop(dataToSave);
            }
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setError('Error al guardar. Intentalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Taller' : 'Nuevo Taller'}</h2>
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>URL de Imagen</label>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                    />
                    {formData.image && <img src={formData.image} alt="Preview" className="img-preview" />}
                </div>

                <div className="form-group">
                    <label>Descripción Corta</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>Descripción Completa (un párrafo por línea)</label>
                    <textarea
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        rows="10"
                    />
                </div>

                <div className="form-group">
                    <label>Ideal para... (un item por línea)</label>
                    <textarea
                        name="idealFor"
                        value={formData.idealFor}
                        onChange={handleChange}
                        rows="5"
                    />
                </div>

                <div className="buttons">
                    <button type="button" onClick={() => navigate('/admin')} className="cancel-btn">
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading} className="save-btn">
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>

            <style jsx="true">{`
        .form-container {
          padding: 100px 20px 40px;
          max-width: 800px;
          margin: 0 auto;
          background-color: var(--bg-main);
          color: var(--text-main);
        }
        
        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background-color: var(--bg-main);
          color: var(--text-main);
          font-family: inherit;
        }

        .img-preview {
          margin-top: 10px;
          max-height: 200px;
          border-radius: 4px;
        }

        .buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .save-btn {
          background-color: var(--primary);
          color: white;
        }

        .cancel-btn {
          background-color: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default WorkshopForm;

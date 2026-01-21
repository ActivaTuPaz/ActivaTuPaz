import { useState, useEffect } from 'react';
import { getSiteConfig, updateSiteConfig } from '../../services/configService';

const GeneralConfigForm = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Initial state matching the structure we want in Firestore
    const [formData, setFormData] = useState({
        hero: {
            staticImage: '',
            staticImageMobile: '',
            carouselImages: [] // Array of strings
        },
        about: {
            bio: '', // We can store this as a long string for now because splitting into paragraphs might be complex to manage without a rich editor
            imageLight: '',
            imageDark: '',
            videoUrl: ''
        }
    });

    // Helper for carousel image inputs
    const [newCarouselImage, setNewCarouselImage] = useState('');

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            const data = await getSiteConfig();
            if (data) {
                // Merge with default structure to ensure all fields exist
                setFormData(prev => ({
                    ...prev,
                    ...data,
                    hero: { ...prev.hero, ...data.hero },
                    about: { ...prev.about, ...data.about }
                }));
            }
        } catch (error) {
            console.error("Error loading config:", error);
            setMessage({ type: 'error', text: 'Error al cargar la configuración.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleAddCarouselImage = (e) => {
        e.preventDefault();
        if (newCarouselImage.trim()) {
            setFormData(prev => ({
                ...prev,
                hero: {
                    ...prev.hero,
                    carouselImages: [...prev.hero.carouselImages, newCarouselImage.trim()]
                }
            }));
            setNewCarouselImage('');
        }
    };

    const handleRemoveCarouselImage = (index) => {
        setFormData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                carouselImages: prev.hero.carouselImages.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await updateSiteConfig(formData);
            setMessage({ type: 'success', text: 'Configuración guardada exitosamente.' });
        } catch (error) {
            console.error("Error saving config:", error);
            setMessage({ type: 'error', text: 'Error al guardar. Intente nuevamente.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Cargando configuración...</div>;

    return (
        <div className="config-form-container">
            <h2>Configuración General del Sitio</h2>

            {message && (
                <div className={`message ${message.type === 'error' ? 'error-msg' : 'success-msg'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">

                {/* Hero Section */}
                <div className="form-section">
                    <h3>Sección Hero (Portada)</h3>

                    <div className="form-group">
                        <label>Imagen Estática (Desktop)</label>
                        <input
                            type="text"
                            value={formData.hero.staticImage}
                            onChange={(e) => handleChange('hero', 'staticImage', e.target.value)}
                            placeholder="URL de la imagen"
                        />
                    </div>

                    <div className="form-group">
                        <label>Imagen Estática (Móvil)</label>
                        <input
                            type="text"
                            value={formData.hero.staticImageMobile}
                            onChange={(e) => handleChange('hero', 'staticImageMobile', e.target.value)}
                            placeholder="URL de la imagen (opcional)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Carrusel de Imágenes (Mini)</label>
                        <div className="carousel-input-group">
                            <input
                                type="text"
                                value={newCarouselImage}
                                onChange={(e) => setNewCarouselImage(e.target.value)}
                                placeholder="Añadir URL de imagen al carrusel"
                            />
                            <button type="button" onClick={handleAddCarouselImage} className="add-btn">
                                Agregar
                            </button>
                        </div>
                        <div className="image-list">
                            {formData.hero.carouselImages.map((img, index) => (
                                <div key={index} className="image-list-item">
                                    <img src={img} alt={`Slide ${index}`} className="mini-thumb" />
                                    <span className="url-text">{img}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCarouselImage(index)}
                                        className="remove-btn"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <hr className="form-divider" />

                {/* About Section */}
                <div className="form-section">
                    <h3>Sección Sobre Mí</h3>

                    <div className="form-group">
                        <label>Biografía (Texto)</label>
                        <textarea
                            rows="6"
                            value={formData.about.bio}
                            onChange={(e) => handleChange('about', 'bio', e.target.value)}
                            placeholder="Escribe el texto de la sección 'Sobre Mí'. Usa saltos de línea para separar párrafos."
                        />
                        <small>Los saltos de línea se respetarán en la visualización.</small>
                    </div>

                    <div className="form-group">
                        <label>Imagen de Perfil (Modo Claro)</label>
                        <input
                            type="text"
                            value={formData.about.imageLight}
                            onChange={(e) => handleChange('about', 'imageLight', e.target.value)}
                            placeholder="URL imagen fondo claro (me-white.webp)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Imagen de Perfil (Modo Oscuro)</label>
                        <input
                            type="text"
                            value={formData.about.imageDark}
                            onChange={(e) => handleChange('about', 'imageDark', e.target.value)}
                            placeholder="URL imagen fondo oscuro (me-dark.webp)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Video de YouTube (URL Embed)</label>
                        <input
                            type="text"
                            value={formData.about.videoUrl}
                            onChange={(e) => handleChange('about', 'videoUrl', e.target.value)}
                            placeholder="Ej: https://www.youtube.com/embed/..."
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={saving}>
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

            </form>

            <style jsx="true">{`
                .config-form-container {
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .form-section {
                    margin-bottom: 30px;
                }

                .form-divider {
                    border: 0;
                    border-top: 1px solid var(--border-color, #ccc);
                    margin: 30px 0;
                }

                .carousel-input-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }

                .image-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .image-list-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255,255,255,0.05);
                    padding: 8px;
                    border-radius: 4px;
                }

                .mini-thumb {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 4px;
                }

                .url-text {
                    flex: 1;
                    font-size: 0.85rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    opacity: 0.8;
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

                .submit-btn {
                    background-color: var(--primary);
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                }

                .add-btn {
                    background-color: var(--secondary);
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    white-space: nowrap;
                }
                
                .remove-btn {
                    background: none;
                    border: none;
                    color: var(--error, #ff4444);
                    cursor: pointer;
                    font-weight: bold;
                    padding: 4px 8px;
                }

                .remove-btn:hover {
                    background: rgba(255,0,0,0.1);
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default GeneralConfigForm;

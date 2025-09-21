import React, { useState, useEffect } from 'react';
import '../App.css'

const Calculate = () => {
    const [formData, setFormData] = useState({
        rates: { EUR: '', USD: '', GBP: '' },
        fabric: { unit_eur: '', price_eur: '', metre_eur: '' },
        genel_gider: { '0-50': '', '51-100': '', '101-200': '' },
        karlilik: { '0-50': '', '51-100': '', '101-200': '' },
        KDV: '',
        komisyon: '',
        batch: { '0-50': '', '51-100': '', '101-200': '' }
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [defaults, setDefaults] = useState(null);
    const [showDefaults, setShowDefaults] = useState(false);

    useEffect(() => {
        fetchDefaults();
    }, []);

    const fetchDefaults = async () => {
        try {
            const response = await fetch('https://cost-system-backend.onrender.com/api/schema');
            const data = await response.json();
            if (data.success) {
                setDefaults(data.defaults);
            }
        } catch (err) {
            console.error('Failed to fetch defaults:', err);
        }
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const cleanData = {};
            Object.keys(formData).forEach(section => {
                const sectionData = {};
                let hasValue = false;
                Object.keys(formData[section]).forEach(field => {
                    if (formData[section][field] !== '') {
                        sectionData[field] = parseFloat(formData[section][field]) || formData[section][field];
                        hasValue = true;
                    }
                });
                if (hasValue) cleanData[section] = sectionData;
            });

            const response = await fetch('https://cost-system-backend.onrender.com/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanData),
            });

            const data = await response.json();
            if (data.success) {
                setResult(data.data);
                setSuccess(true);
            } else {
                setError(data.error?.message || 'Calculation failed');
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount, currency = 'TRY') => {
        if (amount === null || amount === undefined) return '0.00';
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <>


            <div className="container">
                <div className="header">
                    <h1>
                        🧮 Maliyet Hesaplama Sistemi
                    </h1>
                    <p>Excel tabanlı üretim maliyeti hesaplama aracı</p>
                </div>

                <div className="grid">
                    {/* Form Section */}
                    <div>
                        {/* Exchange Rates */}
                        <div className="card">
                            <div className="card-header">
                                💱 Döviz Kurları
                            </div>
                            <div className="form-grid form-grid-3">
                                {['EUR', 'USD', 'GBP'].map((currency) => (
                                    <div key={currency} className="form-group">
                                        <label className="form-label">
                                            {currency}/TRY
                                            {defaults && (
                                                <span className="default-hint"> (default: {defaults.rates[currency]})</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder={defaults?.rates[currency] || '0.00'}
                                            className="form-input currency-input"
                                            value={formData.rates[currency]}
                                            onChange={(e) => handleInputChange('rates', currency, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fabric Costs */}
                        <div className="card">
                            <div className="card-header">
                                📦 Kumaş Maliyetleri (EUR)
                            </div>
                            <div className="form-grid form-grid-3">
                                {[
                                    { key: 'unit_eur', label: 'Birim Fiyat' },
                                    { key: 'price_eur', label: 'Fiyat' },
                                    { key: 'metre_eur', label: 'Metre Fiyat' }
                                ].map((item) => (
                                    <div key={item.key} className="form-group">
                                        <label className="form-label">
                                            {item.label}
                                            {defaults && (
                                                <span className="default-hint"> (default: {defaults.fabric[item.key]})</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder={defaults?.fabric[item.key] || '0.00'}
                                            className="form-input fabric-input"
                                            value={formData.fabric[item.key]}
                                            onChange={(e) => handleInputChange('fabric', item.key, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Percentages */}
                        <div className="card">
                            <div className="card-header">
                                📊 Vergi ve Komisyon (%)
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">
                                        KDV (%)
                                        {defaults && (
                                            <span className="default-hint"> (default: {defaults.KDV}%)</span>
                                        )}
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder={defaults?.KDV || '20'}
                                        className="form-input percentage-input"
                                        value={formData.KDV}
                                        onChange={(e) => handleInputChange('', 'KDV', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Komisyon (%)
                                        {defaults && (
                                            <span className="default-hint"> (default: {defaults.komisyon}%)</span>
                                        )}
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder={defaults?.komisyon || '5'}
                                        className="form-input percentage-input"
                                        value={formData.komisyon}
                                        onChange={(e) => handleInputChange('', 'komisyon', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Range Settings */}
                        <div className="card">
                            <div className="card-header">
                                ⚙️ Adet Aralıklarına Göre Oranlar
                            </div>

                            {/* Genel Gider */}
                            <div className="section-title">Genel Gider (%)</div>
                            <div className="form-grid form-grid-3">
                                {['0-50', '51-100', '101-200'].map((range) => (
                                    <div key={range} className="form-group">
                                        <label className="form-label">
                                            {range} adet
                                            {defaults && (
                                                <span className="default-hint"> (default: {defaults.genel_gider[range]}%)</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder={defaults?.genel_gider[range] || '0'}
                                            className="form-input range-input"
                                            value={formData.genel_gider[range]}
                                            onChange={(e) => handleInputChange('genel_gider', range, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Karlılık */}
                            <div className="section-title">Karlılık (%)</div>
                            <div className="form-grid form-grid-3">
                                {['0-50', '51-100', '101-200'].map((range) => (
                                    <div key={range} className="form-group">
                                        <label className="form-label">
                                            {range} adet
                                            {defaults && (
                                                <span className="default-hint"> (default: {defaults.karlilik[range]}%)</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder={defaults?.karlilik[range] || '0'}
                                            className="form-input range-input"
                                            value={formData.karlilik[range]}
                                            onChange={(e) => handleInputChange('karlilik', range, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Batch Sizes */}
                            <div className="section-title">Batch Boyutları</div>
                            <div className="form-grid form-grid-3">
                                {['0-50', '51-100', '101-200'].map((range) => (
                                    <div key={range} className="form-group">
                                        <label className="form-label">{range} aralığı</label>
                                        <input
                                            type="number"
                                            placeholder={range === '0-50' ? '25' : range === '51-100' ? '75' : '150'}
                                            className="form-input range-input"
                                            value={formData.batch[range]}
                                            onChange={(e) => handleInputChange('batch', range, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <div className="card">
                            <button
                                onClick={handleCalculate}
                                disabled={loading}
                                className="calculate-btn"
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Hesaplanıyor...
                                    </>
                                ) : (
                                    <>
                                        🧮 Maliyet Hesapla
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div>
                        <div className="results-section">

                            {/* Status Messages */}
                            {error && (
                                <div className="alert alert-error">
                                    ❌ <strong>Hata:</strong> {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    ✅ <strong>Başarılı:</strong> Hesaplama tamamlandı!
                                </div>
                            )}

                            {/* Results Display */}
                            {result && (
                                <div className="card">
                                    <div className="card-header">
                                        📄 Hesaplama Sonuçları
                                    </div>

                                    {Object.entries(result.result || {}).map(([range, data]) => (
                                        <div key={range} className="result-range">
                                            <div className="range-title">{range} Adet Aralığı</div>

                                            <div className="result-row">
                                                <span className="result-label">Batch Boyutu:</span>
                                                <span className="result-value">{data.batchSize} adet</span>
                                            </div>

                                            <div className="result-row">
                                                <span className="result-label">Ham Maliyet:</span>
                                                <span className="result-value">{formatCurrency(data.hamMaliyetEur, 'EUR')}</span>
                                            </div>

                                            <div className="result-row">
                                                <span className="result-label">Genel Gider:</span>
                                                <span className="result-value">{formatCurrency(data.genelGiderEur, 'EUR')}</span>
                                            </div>

                                            <div className="result-row">
                                                <span className="result-label">Kar:</span>
                                                <span className="result-value">{formatCurrency(data.karEur, 'EUR')}</span>
                                            </div>

                                            <div className="result-row">
                                                <span className="result-label">KDV:</span>
                                                <span className="result-value">{formatCurrency(data.kdvEur, 'EUR')}</span>
                                            </div>

                                            <div className="result-section">
                                                <div className="result-row final-total">
                                                    <span>Final Toplam:</span>
                                                    <span></span>
                                                </div>
                                                <div className="result-row final-total final-try">
                                                    <span>TRY:</span>
                                                    <span>{formatCurrency(data.finalTry, 'TRY')}</span>
                                                </div>
                                                <div className="result-row final-total final-eur">
                                                    <span>EUR:</span>
                                                    <span>{formatCurrency(data.finalEur, 'EUR')}</span>
                                                </div>
                                                <div className="result-row final-total final-usd">
                                                    <span>USD:</span>
                                                    <span>{formatCurrency(data.finalUsd, 'USD')}</span>
                                                </div>
                                            </div>

                                            <div className="result-section unit-prices">
                                                <div style={{fontWeight: '600', marginBottom: '0.5rem'}}>Birim Fiyatlar:</div>
                                                <div className="result-row">
                                                    <span>Birim TRY:</span>
                                                    <span>{formatCurrency(data.perUnitFinalTry, 'TRY')}</span>
                                                </div>
                                                <div className="result-row">
                                                    <span>Birim EUR:</span>
                                                    <span>{formatCurrency(data.perUnitFinalEur, 'EUR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Default Values */}
                            {defaults && (
                                <div className="card">
                                    <button
                                        onClick={() => setShowDefaults(!showDefaults)}
                                        className="defaults-toggle"
                                    >
                                        <span>Default Değerler</span>
                                        <span className="toggle-icon">{showDefaults ? '−' : '+'}</span>
                                    </button>

                                    {showDefaults && (
                                        <div className="defaults-content">
                                            <div><strong>Döviz Kurları:</strong></div>
                                            <div>EUR: {defaults.rates.EUR}, USD: {defaults.rates.USD}, GBP: {defaults.rates.GBP}</div>
                                            <div><strong>KDV:</strong> {defaults.KDV}%</div>
                                            <div><strong>Komisyon:</strong> {defaults.komisyon}%</div>
                                            <div style={{marginTop: '0.5rem', fontSize: '0.7rem', color: '#9ca3af'}}>
                                                * Boş bırakılan alanlar için bu değerler kullanılır
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calculate;
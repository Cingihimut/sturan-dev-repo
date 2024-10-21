"use client";
import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { Label, TextInput, Button } from 'flowbite-react';
import emailjs from 'emailjs-com';

const Campaign = () => {
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        campaignName: '',
        contactEmail: '',
        address: '',
    });

    useEffect(() => {
        emailjs.init('e3OBOm1y7-NPErMTw'); // Public Key
    }, []);

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
        setErrorMessage('');
        setSuccessMessage('');

        const hexRegex = /^0x[0-9a-fA-F]+$/;
        if (!value.startsWith('0x')) {
            setErrorMessage('Address harus dimulai dengan 0x...');
            return;
        }
        if (!hexRegex.test(value)) {
            setErrorMessage('Address hanya boleh mengandung karakter hex (0-9 atau A-F)');
            return;
        }
        if (value.length !== 42) {
            setErrorMessage('Address harus memiliki panjang 42 karakter.');
            return;
        }
        setFormData((prevState) => ({ ...prevState, address: value }));
        setSuccessMessage('Alamat Valid');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            campaignName: '',
            contactEmail: '',
            address: '',
        });
        setAddress('');
        setSuccessMessage('');
        setErrorMessage('');
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!address || errorMessage || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const templateParams = {
                to_name: 'Admin Sturan', // Nama penerima email
                from_name: formData.name,
                campaign_name: formData.campaignName,
                contact_email: formData.contactEmail,
                wallet_address: formData.address,
                message: `
                    Nama: ${formData.name}
                    Campaign: ${formData.campaignName}
                    Email: ${formData.contactEmail}
                    Address: ${formData.address}
                `
            };
            await emailjs.send(
                'service_sturanet1',
                'template_sturanet1',
                templateParams
            );

            alert("Proposal berhasil dikirim!");
            resetForm();
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Gagal mengirim proposal: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-color-navbar">
                <div className="flex flex-col items-center space-y-6 mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">Sturan Network</h1>
                    <h1 className="text-xl font-bold tracking-tight">
                        Jadilah Bagian dari Revolusi Crowdfunding!
                    </h1>
                    <div className="space-y-4 text-gray-600">
                        <p>Ajukan campaign Anda ke Sturan Network dan biarkan komunitas kami mendukung proyek Anda.</p>
                    </div>
                </div>
                <form className="flex flex-col gap-4 bg-color-navbar" onSubmit={sendEmail}>
                    <div>
                        <Label htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            placeholder="Enter your name"
                            required
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="campaignName" value="Campaign name" />
                        <TextInput
                            id="campaignName"
                            placeholder="Enter your campaign name"
                            required
                            type="text"
                            value={formData.campaignName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="contactEmail" value="Email of contact person" />
                        <TextInput
                            id="contactEmail"
                            placeholder="Enter your email"
                            required
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="address" value="Address EVM to display in the voting platform" />
                        <TextInput
                            id="address"
                            placeholder="0x...."
                            required
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                            color={errorMessage ? 'failure' : successMessage ? 'success' : 'gray'}
                            helperText={
                                errorMessage ? (
                                    <span className="text-red-500">{errorMessage}</span>
                                ) : successMessage ? (
                                    <span className="text-green-500">{successMessage}</span>
                                ) : null
                            }
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="mt-4 bg-color-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Mengirim...' : 'Submit Proposal'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Campaign;
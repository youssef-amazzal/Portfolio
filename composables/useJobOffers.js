export const useJobOffers = () => {
    const jobOffers = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchJobOffers = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await fetch('/data/job-offers.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch job offers: ${response.status}`);
            }
            const data = await response.json();
            jobOffers.value = data;
        } catch (err) {
            error.value = err.message;
            console.error('Error loading job offers:', err);
        } finally {
            loading.value = false;
        }
    };

    const getOfferById = (id) => {
        return jobOffers.value.find(offer => offer.id === id);
    };

    const getOffersByStatus = (status) => {
        if (status === 'All') return jobOffers.value;
        return jobOffers.value.filter(offer => offer.status === status);
    };

    const getOffersByCompany = (company) => {
        return jobOffers.value.filter(offer => 
            offer.company.toLowerCase().includes(company.toLowerCase())
        );
    };

    const addJobOffer = (offer) => {
        jobOffers.value.push({
            ...offer,
            id: offer.id || `offer-${Date.now()}`,
            applicationDate: offer.applicationDate || new Date().toISOString().split('T')[0]
        });
    };

    const updateJobOfferStatus = (id, newStatus) => {
        const offer = getOfferById(id);
        if (offer) {
            offer.status = newStatus;
        }
    };

    const getStatusCount = (status) => {
        return getOffersByStatus(status).length;
    };

    const getStatusCounts = () => {
        const statuses = ['Applied', 'Interview', 'Rejected', 'Accepted'];
        return statuses.reduce((counts, status) => {
            counts[status] = getStatusCount(status);
            return counts;
        }, {});
    };

    return {
        jobOffers: readonly(jobOffers),
        loading: readonly(loading),
        error: readonly(error),
        fetchJobOffers,
        getOfferById,
        getOffersByStatus,
        getOffersByCompany,
        addJobOffer,
        updateJobOfferStatus,
        getStatusCount,
        getStatusCounts
    };
};

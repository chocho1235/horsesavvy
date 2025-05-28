import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CalendarDays, Clock, User, Users, Award } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/services/supabaseClient';

// Types for clinic data
export interface ClinicData {
  id: string;
  name: string;
  description: string;
  price: string;
  max_participants: number;
  date: string;
  time: string;
  date_value: string;
  time_value: string;
  instructor: string;
  level: string;
  featured: boolean;
}

// Clinic Form Component
const ClinicForm = ({ clinic, onSave, onCancel }: {
  clinic?: ClinicData;
  onSave: (data: Omit<ClinicData, 'id'>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Omit<ClinicData, 'id'>>({
    name: clinic?.name || '',
    description: clinic?.description || '',
    price: clinic?.price || '',
    max_participants: clinic?.max_participants || 6,
    date: clinic?.date || '',
    time: clinic?.time || '',
    date_value: clinic?.date_value || '',
    time_value: clinic?.time_value || '',
    instructor: clinic?.instructor || '',
    level: clinic?.level || 'All Levels',
    featured: clinic?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.instructor || !formData.date_value) {
      toast.error("Please fill in all required fields (including a valid date)");
      return;
    }
    await onSave(formData);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-6 h-6" />
          {clinic ? 'Edit Clinic' : 'Add New Clinic'}
        </CardTitle>
        <CardDescription className="text-white/90">
          {clinic ? 'Update clinic information' : 'Create a new clinic offering'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white font-semibold block mb-2">Clinic Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Advanced Dressage"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
            <div>
              <label className="text-white font-semibold block mb-2">Instructor *</label>
              <Input
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g., Sarah Mitchell"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
          </div>

          <div>
            <label className="text-white font-semibold block mb-2">Description *</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the clinic"
              className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-white font-semibold block mb-2">Price *</label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., £65"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
            <div>
              <label className="text-white font-semibold block mb-2">Max Participants</label>
              <Input
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) || 6 })}
                min="1"
                max="20"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
            <div>
              <label className="text-white font-semibold block mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full bg-blue-900/50 border border-white/30 text-white h-12 rounded-md px-3"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white font-semibold block mb-2">Date</label>
              <Input
                type="date"
                value={formData.date_value}
                onChange={(e) => {
                  const isoDate = e.target.value;
                  // Optionally, format a human-readable date string
                  const readable = isoDate ? new Date(isoDate).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
                  setFormData({
                    ...formData,
                    date_value: isoDate,
                    date: readable,
                  });
                }}
                placeholder="e.g., 2024-07-01"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
            <div>
              <label className="text-white font-semibold block mb-2">Time</label>
              <Input
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 9:00 AM - 11:00 AM"
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-red-600 cursor-pointer"
            />
            <label htmlFor="featured" className="text-white font-medium">Featured Clinic</label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="bg-blue-900/50 border-white/30 text-white hover:bg-blue-800 px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 flex-1"
            >
              {clinic ? 'Update Clinic' : 'Create Clinic'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Main Clinic Management Component
export const ClinicManagement = () => {
  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [showClinicForm, setShowClinicForm] = useState(false);
  const [editingClinic, setEditingClinic] = useState<ClinicData | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch clinics from Supabase
  const fetchClinics = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clinics').select('*').order('date_value', { ascending: true });
    if (error) {
      toast.error('Failed to load clinics from Supabase');
      setClinics([]);
    } else {
      setClinics(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  // Add new clinic
  const addClinic = async (clinicData: Omit<ClinicData, 'id'>) => {
    setLoading(true);
    console.log('Sending to Supabase:', clinicData);
    const { error } = await supabase.from('clinics').insert([{ ...clinicData }]);
    if (error) {
      console.error('Supabase insert error:', error);
      toast.error('Failed to add clinic');
    } else {
      toast.success('Clinic added successfully!');
      fetchClinics();
      setShowClinicForm(false);
    }
    setLoading(false);
  };

  // Edit clinic
  const editClinic = async (clinicId: string, clinicData: Omit<ClinicData, 'id'>) => {
    setLoading(true);
    const { error } = await supabase.from('clinics').update({ ...clinicData }).eq('id', clinicId);
    if (error) {
      toast.error('Failed to update clinic');
    } else {
      toast.success('Clinic updated successfully!');
      fetchClinics();
      setEditingClinic(null);
      setShowClinicForm(false);
    }
    setLoading(false);
  };

  // Delete clinic
  const deleteClinic = async (clinicId: string) => {
    if (confirm('Are you sure you want to delete this clinic? This action cannot be undone.')) {
      setLoading(true);
      const { error } = await supabase.from('clinics').delete().eq('id', clinicId);
      if (error) {
        toast.error('Failed to delete clinic');
      } else {
        toast.success('Clinic deleted successfully!');
        fetchClinics();
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* Clinic Management Header */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">Clinic Management</h2>
          <p className="text-white/70">Manage available clinics and offerings</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setEditingClinic(null);
              setShowClinicForm(true);
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Clinic
          </Button>
        </div>
      </div>

      {/* Clinic Form */}
      {showClinicForm && (
        <div className="mb-8">
          <ClinicForm
            clinic={editingClinic || undefined}
            onSave={async (data) => {
              if (editingClinic) {
                await editClinic(editingClinic.id, data);
              } else {
                await addClinic(data);
              }
            }}
            onCancel={() => {
              setShowClinicForm(false);
              setEditingClinic(null);
            }}
          />
        </div>
      )}

      {/* Clinics Grid */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-6 h-6" />
            Available Clinics ({clinics.length})
          </CardTitle>
          <CardDescription className="text-white/90">
            Manage your clinic offerings
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-12 text-white/60">
              <Award className="w-16 h-16 text-white/30 mx-auto mb-4 animate-pulse" />
              <p className="text-lg">Loading clinics...</p>
            </div>
          ) : clinics.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Award className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-lg">No clinics available</p>
              <p className="text-sm text-white/50">Add your first clinic to get started</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <div key={clinic.id} className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {clinic.featured && (
                          <Badge className="bg-yellow-600 text-white text-xs px-2 py-1">
                            Featured
                          </Badge>
                        )}
                        <Badge className="bg-red-600 text-white text-sm px-2 py-1">
                          {clinic.level}
                        </Badge>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{clinic.name}</h3>
                      <p className="text-white/70 text-sm mb-3">{clinic.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">Instructor: {clinic.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">{clinic.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">{clinic.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">Max {clinic.max_participants} participants</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="text-2xl font-bold text-white">{clinic.price}</div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditingClinic(clinic);
                          setShowClinicForm(true);
                        }}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteClinic(clinic.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}; 
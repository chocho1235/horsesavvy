import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CalendarDays, Clock, User, Users, Award } from "lucide-react";
import { toast } from "sonner";

// Types for clinic data
export interface ClinicData {
  id: string;
  name: string;
  description: string;
  price: string;
  maxParticipants: number;
  date: string;
  time: string;
  dateValue: string;
  timeValue: string;
  instructor: string;
  level: string;
  featured: boolean;
}

// Sample clinics for demo purposes
const defaultClinics: ClinicData[] = [
  {
    id: "dressage-1",
    name: "Dressage Clinic",
    description: "Focus on precision, balance, and communication between horse and rider",
    price: "£60",
    maxParticipants: 6,
    date: "Saturday, January 27, 2024",
    time: "9:00 AM - 11:00 AM",
    dateValue: "2024-01-27",
    timeValue: "09:00",
    instructor: "Sarah Mitchell",
    level: "Intermediate",
    featured: false,
  },
  {
    id: "jumping-1",
    name: "Show Jumping Clinic",
    description: "Develop jumping technique, course strategy, and confidence",
    price: "£65",
    maxParticipants: 6,
    date: "Sunday, January 28, 2024",
    time: "2:00 PM - 4:00 PM",
    dateValue: "2024-01-28",
    timeValue: "14:00",
    instructor: "James Thompson",
    level: "All Levels",
    featured: true,
  },
  {
    id: "cross-country-1",
    name: "Cross Country Clinic",
    description: "Navigate varied terrain and obstacles with confidence",
    price: "£70",
    maxParticipants: 4,
    date: "Saturday, February 3, 2024",
    time: "10:00 AM - 12:00 PM",
    dateValue: "2024-02-03",
    timeValue: "10:00",
    instructor: "Emma Roberts",
    level: "Advanced",
    featured: false,
  },
  {
    id: "flatwork-1",
    name: "Flatwork Fundamentals",
    description: "Master the basics of horse training and riding technique",
    price: "£55",
    maxParticipants: 8,
    date: "Sunday, February 4, 2024",
    time: "11:00 AM - 1:00 PM",
    dateValue: "2024-02-04",
    timeValue: "11:00",
    instructor: "Lisa Williams",
    level: "Beginner",
    featured: false,
  },
];

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
    maxParticipants: clinic?.maxParticipants || 6,
    date: clinic?.date || '',
    time: clinic?.time || '',
    dateValue: clinic?.dateValue || '',
    timeValue: clinic?.timeValue || '',
    instructor: clinic?.instructor || '',
    level: clinic?.level || 'All Levels',
    featured: clinic?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.instructor) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave(formData);
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
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 6 })}
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
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., Saturday, January 27, 2024"
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
              className="w-4 h-4 text-red-600"
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

  // Load clinics from localStorage
  useEffect(() => {
    const storedClinics = localStorage.getItem("clinic-types");
    if (storedClinics) {
      const parsedClinics = JSON.parse(storedClinics);
      if (parsedClinics.length > 0) {
        setClinics(parsedClinics);
      } else {
        setClinics(defaultClinics);
        localStorage.setItem("clinic-types", JSON.stringify(defaultClinics));
      }
    } else {
      setClinics(defaultClinics);
      localStorage.setItem("clinic-types", JSON.stringify(defaultClinics));
    }
  }, []);

  // Save clinics to localStorage
  const saveClinics = (updatedClinics: ClinicData[]) => {
    setClinics(updatedClinics);
    localStorage.setItem("clinic-types", JSON.stringify(updatedClinics));
  };

  // Add new clinic
  const addClinic = (clinicData: Omit<ClinicData, 'id'>) => {
    const newClinic: ClinicData = {
      ...clinicData,
      id: `clinic-${Date.now()}`,
    };
    const updatedClinics = [...clinics, newClinic];
    saveClinics(updatedClinics);
    setShowClinicForm(false);
    toast.success("Clinic added successfully!");
  };

  // Edit clinic
  const editClinic = (clinicId: string, clinicData: Omit<ClinicData, 'id'>) => {
    const updatedClinics = clinics.map(clinic =>
      clinic.id === clinicId ? { ...clinicData, id: clinicId } : clinic
    );
    saveClinics(updatedClinics);
    setEditingClinic(null);
    setShowClinicForm(false);
    toast.success("Clinic updated successfully!");
  };

  // Delete clinic
  const deleteClinic = (clinicId: string) => {
    if (confirm("Are you sure you want to delete this clinic? This action cannot be undone.")) {
      const updatedClinics = clinics.filter(clinic => clinic.id !== clinicId);
      saveClinics(updatedClinics);
      toast.success("Clinic deleted successfully!");
    }
  };

  // Load sample clinic data
  const loadSampleClinicData = () => {
    setClinics(defaultClinics);
    localStorage.setItem("clinic-types", JSON.stringify(defaultClinics));
    toast.success("Sample clinics loaded for demo!");
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
            onClick={loadSampleClinicData}
            variant="outline"
            className="bg-blue-900/50 border-white/30 text-white hover:bg-blue-800 px-4 py-2"
          >
            🎯 Load Sample Clinics
          </Button>
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
            onSave={(data) => {
              if (editingClinic) {
                editClinic(editingClinic.id, data);
              } else {
                addClinic(data);
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
          {clinics.length === 0 ? (
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
                      <span className="text-white/80">Max {clinic.maxParticipants} participants</span>
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